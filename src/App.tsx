import { FC, useEffect } from "react";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import ClassroomContainer from "./containers/ClassroomContainer";
import ClassroomEditContainer from "./containers/ClassroomEditContainer";
import LessonsContainer from "./containers/LessonsContainer";
import StudentLessonContainer from "./containers/StudentLessonContainer";
import CLessonContainer from "./containers/CLessonContainer";
import TeacherFollowContainer from "./containers/TeacherFollowContainer";
import LessonsToClassroomContainer from "./containers/LessonsToClassroomContainer";
import EditUserContainer from "./containers/EditUserContainer";
import StackQuestionMenu from "./components/StackQuestionMenu";
import ReportContainer from "./containers/ReportContainer";
import { autologin, logout } from "./services/users.ts";
import { Helmet } from "react-helmet";
import ToggleDarkMode from "./components/DarkModeToggle";
import { ToastContainer, toast } from "react-toastify";
import { Container } from "semantic-ui-react";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "./store/hooks";
// Prefer slice action creators if you have them:
import { setUser, unsetUser } from "./store/userSlice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const background = useAppSelector((state) => state.app.background);

  const notifyLogOut = (): void => {
    toast.success("Logout Successful", {
      position: "bottom-right",
    });
  };

  useEffect(() => {
    autologin()
      .then((data) => {
        dispatch(setUser(data.data.attributes));
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  const logOut = (): void => {
    logout().then(() => {
      dispatch(unsetUser());
      notifyLogOut();
      navigate("/");
    });
  };

  return (
    <div>
      <Helmet>
        <style>{`body { background-color: ${background}; }`}</style>
      </Helmet>

      <NavBar currentUser={currentUser} logOut={logOut} />
      <StackQuestionMenu />
      <ToggleDarkMode />

      <Container textAlign="right">
        <ToastContainer />
      </Container>

      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />

        <Route path="/login" element={<LoginForm />} />

        <Route path="/signup" element={<SignupForm />} />

        <Route path="/classroom" element={<ClassroomContainer />} />

        <Route path="/editclassroom" element={<ClassroomEditContainer />} />

        <Route path="/lessons" element={<LessonsContainer />} />

        <Route
          path="/classroom-lesson"
          element={<StudentLessonContainer currentUser={currentUser} />}
        />

        <Route path="/complete-lesson" element={<CLessonContainer />} />

        <Route path="/teacher-follow" element={<TeacherFollowContainer />} />

        <Route path="/add-lesson" element={<LessonsToClassroomContainer />} />

        <Route path="/edit-user" element={<EditUserContainer />} />

        <Route path="/reports" element={<ReportContainer />} />
      </Routes>
    </div>
  );
};

export default App;
