import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CreateStudentStyle from "@/styles/CreateStudent.module.css";
import { CourseTypeEnum, CreateStudentType } from "@/types/student";

const StudentForm = ({
  studentFormValues,
  handleSubmit,
}: {
  studentFormValues: CreateStudentType;
  handleSubmit: (data: CreateStudentType) => void;
}) => {
  const studentForm = useForm<CreateStudentType>({
    mode: "onSubmit",
    defaultValues: studentFormValues,
  });

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = studentForm;

  const maxDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const onSubmit: SubmitHandler<CreateStudentType> = (data) => {
    handleSubmit(data);
  };

  return (
    <form
      onSubmit={handleFormSubmit(onSubmit)}
      className={CreateStudentStyle.container}
    >
      <div className={CreateStudentStyle.inputContainer}>
        <label htmlFor="firstname">Firstname</label>
        <input
          id="firstname"
          placeholder="Enter first name"
          {...register("firstname", {
            required: "Firstname is required",
            minLength: {
              value: 4,
              message: "Firstname should have 4 character atmost",
            },
          })}
        />
        {errors.firstname && (
          <p className={CreateStudentStyle.error}>{errors.firstname.message}</p>
        )}
      </div>

      <div className={CreateStudentStyle.inputContainer}>
        <label htmlFor="lastname">Lastname</label>
        <input
          id="lastname"
          placeholder="Enter last name"
          {...register("lastname", {
            required: "Lastname is required",
            minLength: {
              value: 4,
              message: "Lastname should have 4 character atmost",
            },
          })}
        />

        {errors.lastname && (
          <p className={CreateStudentStyle.error}>{errors.lastname.message}</p>
        )}
      </div>

      <div className={CreateStudentStyle.inputContainer}>
        <label>Course Type</label>
        <select
          id="courseType"
          {...register("courseType", { required: "Course type is required" })}
        >
          <option value={CourseTypeEnum.UG}>UG</option>
          <option value={CourseTypeEnum.PG}>PG</option>
        </select>

        {errors.courseType && (
          <p className={CreateStudentStyle.error}>
            {errors.courseType.message}
          </p>
        )}
      </div>

      <div className={CreateStudentStyle.inputContainer}>
        <label htmlFor="dateOfJoin">Date of Joining</label>
        <input
          id="dateOfJoin"
          type="date"
          max={maxDate}
          {...register("dateOfJoin", {
            required: "Date of Joining is required",
          })}
        />
        {errors.dateOfJoin && (
          <p className={CreateStudentStyle.error}>
            {errors.dateOfJoin.message}
          </p>
        )}
      </div>

      <button className={CreateStudentStyle.createButton}>Save</button>
    </form>
  );
};

export default StudentForm;
