import { CourseTypeEnum } from "@/types/studentList";

const StudentTab = ({ activeTab }: { activeTab: CourseTypeEnum }) => {
  switch (activeTab) {
    case CourseTypeEnum.UG:
      return <p>Ug</p>;

    case CourseTypeEnum.PG:
      return <p>PG</p>;
  }
};

export default StudentTab;
