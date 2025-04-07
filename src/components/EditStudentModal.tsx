import { CreateStudentType } from "@/types/studentList";
import EditStudent from "@/components/form/EditStudent";
import Modal from "@/components/Modals/Modal";

const EditStudentModal = ({
  studentId,
  opened,
  onCancel,
  handleEditStudent,
}: {
  studentId: string;
  opened: boolean;
  onCancel: () => void;
  handleEditStudent: (data: CreateStudentType) => void;
}) => {
  return (
    <Modal
      onCancel={onCancel}
      opened={opened}
      title="Edit Student"
      content={
        <EditStudent
          studentId={studentId}
          handleEditStudent={handleEditStudent}
        />
      }
    />
  );
};

export default EditStudentModal;
