import { useState } from "react";
import dynamic from "next/dynamic";
import { Edit, Trash2 } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { studentList as studentData } from "@/utils/data";
import {
  CreateStudentType,
  StudentListSearchQueryType,
  StudentType,
} from "@/types/studentList";
import HomeModule from "@/styles/Home.module.css";

const EditStudentModal = dynamic(
  () => import("@/components/EditStudentModal").then((mod) => mod.default),
  { ssr: false }
);

const ConfirmationModal = dynamic(
  () => import("@/components/Modals/Modal").then((mod) => mod.default),
  { ssr: false }
);

const StudentListContainer = ({
  studentListSearchQuery,
}: {
  studentListSearchQuery: StudentListSearchQueryType;
}) => {
  //actual data fetching, with having the query
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { searchText, refetchStudentList, pageNumber } = studentListSearchQuery;
  const [studentList, setStudentList] = useState<StudentType[] | null>(
    studentData
  );
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editModalOpened, setEditModalOpened] = useState<boolean>(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);

  const debouncedSearchText = useDebounce(searchText, 300);

  const handleEdit = (studentId: string) => {
    setEditId(studentId);
    setEditModalOpened(true);
  };

  const handleDelete = (studentId: string) => {
    setDeleteId(studentId);
    setDeleteModalOpened(true);
  };

  const onCancelEdit = () => {
    setEditModalOpened(false);
    setEditId(null);
  };

  const onCancelDelete = () => {
    setDeleteModalOpened(false);
    setDeleteId(null);
  };

  const fetchUserList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/studentlist?pageNumber=${pageNumber}&searchText=${searchText}`
      );

      if (response.status >= 200 || response.status <= 299) {
        const data = await response.json();
        setStudentList(data);
      } else {
        throw new Error("Error while parsing json");
      }
    } catch (err) {
      setError("Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStudent = async (data: CreateStudentType) => {
    try {
      await fetch("http://localchost:3000/student", {
        method: "PATCH",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify(data),
      });
      fetchUserList();
    } catch (err) {
      console.log(data);
    }

    onCancelEdit();
  };

  const handleDeleteStudent = async () => {
    try {
      await fetch("http://localchost:3000/student", {
        method: "DELETE",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({ studentId: deleteId }),
      });
      fetchUserList();
    } catch (err) {
    } finally {
      onCancelDelete();
    }
  };

  //for intial fetching
  // useEffect(() => {
  //   fetchUserList();
  // }, []);

  // // while there is a change in query
  // useEffect(() => {
  //   fetchUserList();
  // }, [pageNumber, searchText]);

  // //for some case like edited, new created, or deleted
  // useEffect(() => {
  //   if (refetchStudentList) fetchUserList();
  // }, [refetchStudentList]);

  // if (isLoading || !studentList) return <p>loading...</p>;
  // if (error) return <p>Failed to fetch</p>;

  const start = (pageNumber - 1) * 10,
    end = (pageNumber - 1) * 10 + 10;

  const students = studentData.slice(start, end);

  if (!students) return <div>no student data found</div>;

  return (
    <>
      <div className={HomeModule.studentList}>
        {students.map((student) => {
          const {
            firstname,
            lastname,
            courseType,
            dateOfJoin,
            imageUrl,
            studentId,
          } = student;

          const fullName = firstname + " " + lastname;

          return (
            <div key={studentId} className={HomeModule.studentDetails}>
              <img src={imageUrl} alt={fullName} />

              <h2>{fullName}</h2>
              <p>{courseType}</p>

              <p>Date of Join {dateOfJoin}</p>

              <div className={HomeModule.actionContainer}>
                <button
                  className={`${HomeModule.button} ${HomeModule.deleteButton}`}
                  onClick={() => handleDelete(studentId)}
                >
                  <Trash2 strokeWidth={2.5} />
                  Delete
                </button>
                <button
                  className={`${HomeModule.button} ${HomeModule.editButton}`}
                  onClick={() => handleEdit(studentId)}
                >
                  <Edit strokeWidth={2.5} />
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editId && (
        <EditStudentModal
          opened={editModalOpened}
          onCancel={onCancelEdit}
          studentId={editId}
          handleEditStudent={handleEditStudent}
        />
      )}

      {deleteId && (
        <ConfirmationModal
          opened={deleteModalOpened}
          title="Delete Student"
          description="Do want to delete the student"
          onCancel={onCancelDelete}
          onConfirm={handleDeleteStudent}
        />
      )}
    </>
  );
};

export default StudentListContainer;
