import { useEffect, useState } from "react";
import StudentForm from "@/components/form/StudentForm";
import { CreateStudentType, StudentType } from "@/types/student";
import { studentList } from "@/utils/data";

const EditStudent = ({
  studentId,
  handleEditStudent,
}: {
  studentId: string;
  handleEditStudent: (data: CreateStudentType) => void;
}) => {
  // if we are fetching
  const [studentData, setStudentData] = useState<StudentType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       try {
  //         setIsLoading(true);
  //         const response = await fetch(
  //           `http://localhost:3000/studentlist?pageNumber=${pageNumber}&searchText=${searchText}`
  //         );

  //         if (response.status >= 200 || response.status <= 299) {
  //           const data = await response.json();
  //           setStudentData(data);
  //         } else {
  //           throw new Error("Error while parsing json");
  //         }
  //       } catch (err) {
  //         setError("Failed to fetch");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchUserData();
  //   }, []);

  useEffect(() => {
    let timer;

    setIsLoading(true);
    timer = setTimeout(() => {
      const studentData = studentList.filter(
        (student) => student.studentId === studentId
      )[0];
      setStudentData(studentData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !studentData) return <p>loading...</p>;
  // if (error) return <p>Failed to fetch</p>;

  return (
    <StudentForm
      studentFormValues={studentData}
      handleSubmit={handleEditStudent}
    />
  );
};

export default EditStudent;
