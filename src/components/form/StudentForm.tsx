import { FormEvent, useMemo, useState } from "react";
import CreateStudentStyle from "@/styles/CreateStudent.module.css";
import { CourseTypeEnum, CreateStudentType } from "@/types/studentList";

const StudentForm = ({
  studentFormValues,
  handleSubmit,
}: {
  studentFormValues: CreateStudentType;
  handleSubmit: (data: CreateStudentType) => void;
}) => {
  const [firstname, setFirstname] = useState<string>(
    studentFormValues.firstname
  );
  const [lastname, setLastname] = useState<string>(studentFormValues.lastname);
  const [dateOfJoin, setDateOfJoin] = useState<string>(
    studentFormValues.dateOfJoin
  );
  const [courseType, setCourseType] = useState<CourseTypeEnum>(
    studentFormValues.courseType
  );

  const maxDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ firstname, lastname, dateOfJoin, courseType, imageUrl: "" });
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className={CreateStudentStyle.container}
    >
      <div className={CreateStudentStyle.inputContainer}>
        <label htmlFor="firstname">Firstname</label>
        <input
          id="firstname"
          name="firstname"
          value={firstname}
          required
          minLength={4}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Enter first name"
        />
      </div>

      <div className={CreateStudentStyle.inputContainer}>
        <label htmlFor="lastname">Lastname</label>
        <input
          id="lastname"
          name="lastname"
          value={lastname}
          required
          minLength={1}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Enter first name"
        />
      </div>

      <div className={CreateStudentStyle.inputContainer}>
        <label>Course Type</label>
        <select
          id="courseType"
          name="courseType"
          value={courseType}
          onChange={(e) => setCourseType(e.target.value as CourseTypeEnum)}
        >
          <option value={CourseTypeEnum.UG}>UG</option>
          <option value={CourseTypeEnum.PG}>PG</option>
        </select>
      </div>

      <div className={CreateStudentStyle.inputContainer}>
        <label htmlFor="dateOfJoin">Date of Joining</label>
        <input
          id="dateOfJoin"
          name="dateOfJoin"
          type="date"
          max={maxDate}
          value={dateOfJoin}
          onChange={(e) => setDateOfJoin(e.target.value)}
        />
      </div>

      <button className={CreateStudentStyle.createButton}>Save</button>
    </form>
  );
};

export default StudentForm;
