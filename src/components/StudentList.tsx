import { memo } from "react";
import { StudentType } from "@/types/studentList";
import { Edit, Trash2 } from "lucide-react";
import HomeModule from "@/styles/Home.module.css";

const StudentList = memo(
  ({
    students,
    handleEdit,
    handleDelete,
  }: {
    students: StudentType[];
    handleEdit: (studentId: string) => void;
    handleDelete: (studentId: string) => void;
  }) => {
    return (
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
    );
  }
);

export default StudentList;
