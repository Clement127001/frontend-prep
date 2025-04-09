import { StudentListSearchQueryType } from "@/types/student";

const StudentSearch = ({
  studentListSearchQuery,
  setStudentListSearchQuery,
}: {
  studentListSearchQuery: StudentListSearchQueryType;
  setStudentListSearchQuery: (value: StudentListSearchQueryType) => void;
}) => {
  const { searchText } = studentListSearchQuery;

  return (
    <input
      placeholder="Search student list"
      value={searchText}
      onChange={(e) =>
        setStudentListSearchQuery({
          ...studentListSearchQuery,
          searchText: e.target.value,
        })
      }
    />
  );
};

export default StudentSearch;
