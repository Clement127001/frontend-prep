import Modal from "@/components/Modals/Modal";
import CreateStudent from "@/components/form/StudentForm";
import { useToast } from "@/context/ToastProvider";
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
  const { showToast } = useToast();

  const handleAddSubmit = (data: CreateStudentType) => {
    console.log(data);
    onCancel();
    onCreateStudent();

    showToast({
      description: "Student added succesfully",
      title: "Success",
      position: "top-right",
      type: "success",
    });
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
