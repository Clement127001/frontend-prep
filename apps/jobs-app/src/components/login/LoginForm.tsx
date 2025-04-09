import { UserLogin } from "@/types/login";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Styles from "@/styles/register.module.css";
import { useToast } from "@/context/ToastProvider";
import { apiUrl } from "@/utils/common";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { emailRegex } from "@/utils/register";
import { usePageLoader } from "@/context/PageLoaderProvider";

const LoginForm = () => {
  const { showToast } = useToast();
  const { showPageLoader, hidepageLoader } = usePageLoader();
  const router = useRouter();
  const loginForm = useForm<UserLogin>({
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = loginForm;

  const onLogin: SubmitHandler<UserLogin> = async (data) => {
    showPageLoader("Logging In, please wait");

    try {
      const response = await fetch(apiUrl + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok && response.status == 200) {
        const { token } = await response.json();
        Cookies.set("userToken", token, { expires: 7 });

        showToast({
          title: "User Created",
          description: "User Loggedin successfully",
          duration: 3000,
          position: "top-right",
          type: "success",
        });
        router.push("/jobs");
      } else {
        const err = await response.json();
        showToast({
          title: "Error",
          description: err.msg ?? "Failed to Login user",
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
    } finally {
      hidepageLoader();
    }
  };

  return (
    <form className={Styles.container} onSubmit={handleSubmit(onLogin)}>
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

      <button className={Styles.formAction}>Login</button>
    </form>
  );
};

export default LoginForm;
