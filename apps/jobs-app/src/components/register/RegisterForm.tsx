import { UserRegister } from "@/types/register";
import { defaultCreateUserValue, emailRegex } from "@/utils/register";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Styles from "@/styles/register.module.css";
import { apiUrl } from "@/utils/common";
import Cookies from "js-cookie";
import { useToast } from "@/context/ToastProvider";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const userRegisterForm = useForm<UserRegister>({
    mode: "onSubmit",
    defaultValues: defaultCreateUserValue,
  });
  const { showToast } = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = userRegisterForm;

  const onCreate: SubmitHandler<UserRegister> = async (data) => {
    try {
      const response = await fetch(apiUrl + "auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok && response.status == 201) {
        const { token } = await response.json();
        Cookies.set("userToken", token, { expires: 7 });

        showToast({
          title: "User Created",
          description: "User registered successfully",
          duration: 3000,
          position: "top-right",
          type: "success",
        });
        router.push("/jobs");
      } else {
        const err = await response.json();
        showToast({
          title: "Error",
          description: err.msg ?? "Failed to register user",
          duration: 3000,
          position: "top-right",
          type: "failure",
        });
      }
    } catch (err) {
      showToast({
        title: "Error",
        description: "Failed to fetch",
        duration: 3000,
        position: "top-right",
        type: "failure",
      });
    }
  };

  return (
    <form className={Styles.container} onSubmit={handleSubmit(onCreate)}>
      <div className={Styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 5,
              message: "Name should be 5 character atleast",
            },
          })}
        />
        {errors.name && <p className={Styles.error}>{errors.name.message}</p>}
      </div>
      <div className={Styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: "Email is required",
            validate: (value) =>
              (typeof value === "string" && emailRegex.test(value)) ||
              "Please enter a valid email",
          })}
        />
        {errors.email && <p className={Styles.error}>{errors.email.message}</p>}
      </div>
      <div className={Styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Password should be 6 character atleast",
            },
          })}
        />
        {errors.password && (
          <p className={Styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button className={Styles.formAction}>Register</button>
    </form>
  );
};

export default RegisterForm;
