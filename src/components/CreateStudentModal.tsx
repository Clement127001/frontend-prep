import Modal from "@/components/Modals/Modal";
import CreateStudent from "@/components/form/StudentForm";
import { CreateStudentType } from "@/types/studentList";
import { defaultStudentValues } from "@/utils/data";

const CreateStudentModal = ({
  opened,
  onCancel,
  onCreateStudent,
}: {
  opened: boolean;
  onCancel: () => void;
  onCreateStudent: () => void;
}) => {
  const handleAddSubmit = (data: CreateStudentType) => {
    console.log(data);
    onCancel();
    onCreateStudent();
  };

  return (
    <Modal
      opened={opened}
      onCancel={onCancel}
      content={
        <CreateStudent
          studentFormValues={defaultStudentValues}
          handleSubmit={handleAddSubmit}
        />
      }
      title="Add New Student"
    />
  );
};

export default CreateStudentModal;
