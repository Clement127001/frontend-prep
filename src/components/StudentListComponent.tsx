import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import StudentListContainer from "@/components/StudentListContainer";
import StudentSearch from "@/components/StudentSearch";
import { useQueryState } from "@/hooks/useQueryState";
import { StudentListSearchQueryType } from "@/types/studentList";
import HomeModule from "@/styles/Home.module.css";
import Pagination from "@/components/Pagination";

//TODO: remove the dummy value
const TOTOAL_PAGE = 10;

const CreateStudentModal = dynamic(
  () => import("@/components/CreateStudentModal").then((mod) => mod.default),
  { ssr: false }
);

const StudentListComponent = () => {
  const [studentListSearchQuery, setStudentListSearchQuery] =
    useQueryState<StudentListSearchQueryType>("studentListSearchQuery", {
      searchText: "",
      pageNumber: 1,
      refetchStudentList: false,
    });

  const [createModalOpened, setCreateModalOpened] = useState<boolean>(false);

  const handleAddStudent = () => {
    setCreateModalOpened(true);
  };

  const handleCancelCreate = () => {
    setCreateModalOpened(false);
  };

  const handleChangePageNumber = (val: number) => {
    setStudentListSearchQuery({
      ...studentListSearchQuery,
      pageNumber: val,
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <div className={HomeModule.container}>
        <div className={HomeModule.header}>
          <h1>Student list</h1>
          <button
            className={`${HomeModule.addButton} ${HomeModule.button}`}
            onClick={handleAddStudent}
          >
            <Plus size={16} strokeWidth={2.5} />
            Add Student
          </button>
        </div>
        <StudentSearch
          studentListSearchQuery={studentListSearchQuery}
          setStudentListSearchQuery={setStudentListSearchQuery}
        />
        <StudentListContainer studentListSearchQuery={studentListSearchQuery} />

        <Pagination
          currentPage={studentListSearchQuery.pageNumber}
          totalPages={TOTOAL_PAGE}
          handleChangePageNumber={handleChangePageNumber}
        />
      </div>

      {createModalOpened && (
        <CreateStudentModal
          opened={createModalOpened}
          onCancel={handleCancelCreate}
        />
      )}
    </div>
  );
};

export default StudentListComponent;
