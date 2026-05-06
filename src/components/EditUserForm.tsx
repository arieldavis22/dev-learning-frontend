import React, { useEffect, useState } from "react";
import { editUser } from "../services/users.ts";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { UserState } from "../types/user.types";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/userSlice";

const EditUserForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const menu = useAppSelector((state) => state.app.menu);

  const [formData, setFormData] = useState<UserState>({
    currentUser: null,
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        currentUser: {
          id: currentUser.id,
          first_name: currentUser.first_name || "",
          last_name: currentUser.last_name || "",
        },
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
          value={formData.currentUser?.first_name}
          onChange={handleOnChange}
        />

        <Form.Input
          icon="user"
          iconPosition="left"
          type="text"
          name="last_name"
          placeholder={currentUser.last_name}
          value={formData.currentUser?.last_name}
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
