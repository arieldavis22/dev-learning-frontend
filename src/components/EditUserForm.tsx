import React, { useEffect, useState } from "react";
import { editUser } from "../services/users";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/userSlice";

interface EditUserState {
  first_name: string;
  last_name: string;
  id: string;
}

const EditUserForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const menu = useAppSelector((state) => state.app.menu);

  const [formData, setFormData] = useState<EditUserState>({
    first_name: "",
    last_name: "",
    id: currentUser?.id || "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        id: currentUser.id,
      });
    }
  }, [currentUser]);

  const notifyUserNameChange = (): void => {
    toast.success("Name Changed", {
      position: "bottom-right",
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    editUser(formData).then((data) => {
      dispatch(setUser(data));
      notifyUserNameChange();
      navigate("/");
    });
  };

  if (!currentUser) {
    return null;
  }

  console.log("EDIT USER STATE:", formData);

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Input
          icon="user"
          iconPosition="left"
          type="text"
          name="first_name"
          placeholder={currentUser.first_name}
          value={formData.first_name}
          onChange={handleOnChange}
        />

        <Form.Input
          icon="user"
          iconPosition="left"
          type="text"
          name="last_name"
          placeholder={currentUser.last_name}
          value={formData.last_name}
          onChange={handleOnChange}
        />

        <Button color={menu ? "purple" : undefined} type="submit">
          Change Name
        </Button>
      </Form>
    </div>
  );
};

export default EditUserForm;
