import { CourseTypeEnum } from "@/types/student";

const StudentTab = ({ activeTab }: { activeTab: CourseTypeEnum }) => {
  switch (activeTab) {
    case CourseTypeEnum.UG:
      return <p>Ug</p>;

    case CourseTypeEnum.PG:
      return <p>PG</p>;
  }
};

export default StudentTab;
