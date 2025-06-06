import { memo, useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import StudentList from "@/components/StudentList";
import { useToast } from "@/context/ToastProvider";
import useDebounce from "@/hooks/useDebounce";
import { studentList as studentData } from "@/utils/data";
import {
  CreateStudentType,
  StudentListSearchQueryType,
  StudentType,
} from "@/types/student";

const EditStudentModal = dynamic(
  () => import("@/components/EditStudentModal").then((mod) => mod.default),
  { ssr: false }
);

const ConfirmationModal = dynamic(
  () => import("@/components/Modals/Modal").then((mod) => mod.default),
  { ssr: false }
);

const StudentListContainer = memo(
  ({
    studentListSearchQuery,
  }: {
    studentListSearchQuery: StudentListSearchQueryType;
  }) => {
    //FIXME: dummy fetch only for name sake
    //actual data fetching, with having the query
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [studentList, setStudentList] = useState<StudentType[] | null>(
      studentData
    );
    const { showToast } = useToast();
    const [editId, setEditId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editModalOpened, setEditModalOpened] = useState<boolean>(false);
    const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);

    const { searchText, refetchStudentList, pageNumber } =
      studentListSearchQuery;

    const debouncedSearchText = useDebounce(searchText, 300);

    const handleEdit = useCallback((studentId: string) => {
      setEditId(studentId);
      setEditModalOpened(true);
    }, []);

    const handleDelete = useCallback((studentId: string) => {
      setDeleteId(studentId);
      setDeleteModalOpened(true);
    }, []);

    const onCancelEdit = () => {
      setEditModalOpened(false);
      setEditId(null);
    };

    const onCancelDelete = () => {
      setDeleteModalOpened(false);
      setDeleteId(null);
    };

    //FIXME: dummy fetch only for name sake
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
      console.log(data);
      // try {
      //   await fetch("http://localchost:3000/student", {
      //     method: "PATCH",
      //     headers: {
      //       contentType: "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });
      //   // fetchUserList();
      // } catch (err) {
      //   console.log(data);
      // }

      showToast({
        description: "Student data edited succesfully",
        title: "Success!",
        position: "top-right",
        type: "success",
      });

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
        // fetchUserList();
      } catch (err) {
      } finally {
        onCancelDelete();
      }
    };

    //FIXME: dummy fetch only for name sake
    //for intial fetching
    useEffect(() => {
      fetchUserList();
    }, []);

    // while there is a change in query
    useEffect(() => {
      fetchUserList();
    }, [pageNumber, searchText]);

    //for some case like edited, new created, or deleted
    useEffect(() => {
      if (refetchStudentList) fetchUserList();
    }, [refetchStudentList]);

    // if (isLoading || !studentList) return <p>loading...</p>;
    // if (error) return <p>Failed to fetch</p>;

    const start = (pageNumber - 1) * 10,
      end = (pageNumber - 1) * 10 + 10;

    const students = useMemo(
      () => studentData.slice(start, end),
      [pageNumber, debouncedSearchText, refetchStudentList]
    );

    if (!students) return <div>no student data found</div>;

    return (
      <>
        <StudentList
          students={students}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
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
  }
);

export default StudentListContainer;
