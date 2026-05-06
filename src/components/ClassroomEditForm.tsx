import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { editClassroom } from "../services/classrooms";
import { Button, Form } from "semantic-ui-react";
import { useAppSelector } from "../store/hooks";

interface ClassroomEditFormProps {
  classroomID: string;
  classroomName: string;
}

interface ClassroomEditState {
  name: string;
  classroom_id: string;
}

const ClassroomEditForm = ({
  classroomID,
  classroomName,
}: ClassroomEditFormProps) => {
  const menu = useAppSelector((state) => state.app.menu);

  const [formData, setFormData] = useState<ClassroomEditState>({
    name: "",
    classroom_id: classroomID,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: classroomName,
    }));
  }, [classroomName]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    editClassroom(formData).then(console.log);
  };

  console.log("CLASSROOM EDIT:", formData);

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Input
          type="text"
          name="name"
          placeholder="Enter New Name"
          value={formData.name}
          onChange={handleOnChange}
        />

        <Button color={menu ? "purple" : undefined} type="submit">
          Change Classroom Name
        </Button>
      </Form>
    </div>
  );
};

export default ClassroomEditForm;
