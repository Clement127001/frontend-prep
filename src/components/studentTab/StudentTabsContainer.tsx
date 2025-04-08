import { CourseTypeEnum } from "@/types/studentList";
import { useQueryState } from "@/hooks/useQueryState";
import StudentTab from "@/components/studentTab/StudentTab";
import Styles from "@/styles/StudentTabs.module.css";

const StudentTabsContiner = () => {
  const [activeTab, setActiveTab] = useQueryState<CourseTypeEnum>(
    "activeStudentTab",
    CourseTypeEnum.UG
  );

  const tabList = Object.keys(CourseTypeEnum);

  if (!activeTab) return <></>;

  return (
    <div className={Styles.studentTabContianer}>
      <ul className={Styles.tabsContainer}>
        {tabList.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <li
              className={`${Styles.tab} ${isActive && Styles.activeTab}`}
              onClick={() => {
                setActiveTab(tab as CourseTypeEnum);
              }}
            >
              {tab}
            </li>
          );
        })}
      </ul>

      <StudentTab activeTab={activeTab} />
    </div>
  );
};

export default StudentTabsContiner;
