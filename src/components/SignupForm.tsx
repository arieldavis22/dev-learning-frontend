import React, { useState } from "react";
import FadeIn from "react-fade-in";
import { signup } from "../services/users";
import { Button, Container, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const menu = useAppSelector((state) => state.app.menu);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const notifySignup = () => {
    toast.success("Account Created", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const notifySignupFail = () => {
    toast.error("Invalid Information", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signup(formData)
      .then((data) => {
        console.log("SIGN UP:", data.data.attributes);
        dispatch(setUser(data.data.attributes));
        notifySignup();
        navigate("/");
      })
      .catch(() => notifySignupFail());
  };

  return (
    <div>
      <FadeIn>
        <Container textAlign="center">
          <Form onSubmit={handleOnSubmit}>
            <Form.Input
              icon="user outline"
              iconPosition="left"
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={handleOnChange}
              value={formData.first_name}
            />
            <Form.Input
              icon="user outline"
              iconPosition="left"
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleOnChange}
              value={formData.last_name}
            />
            <Form.Input
              icon="envelope outline"
              iconPosition="left"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleOnChange}
              value={formData.email}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleOnChange}
              value={formData.password}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              type="password"
              placeholder="Password Confirm"
            />
            <label>Teacher Or Student</label>
            <Form.Radio
              type="radio"
              label="Teacher"
              name="role"
              value="Teacher"
              onChange={handleOnChange}
              checked={formData.role === "Teacher"}
            />
            <Form.Radio
              type="radio"
              label="Student"
              name="role"
              value="Student"
              onChange={handleOnChange}
              checked={formData.role === "Student"}
            />
            <Button color={menu ? "purple" : undefined} type="submit">
              Signup
            </Button>
          </Form>
        </Container>
      </FadeIn>
    </div>
  );
};

export default SignupForm;
