import React, { Component } from 'react';
import Home from './components/Home';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import {Route, Switch, Redirect} from 'react-router-dom'
import NavBar from './components/NavBar';
import {connect} from 'react-redux'
import ClassroomContainer from './containers/ClassroomContainer';
import ClassroomEditContainer from './containers/ClassroomEditContainer';
import LessonsContainer from './containers/LessonsContainer';
import StudentLessonContainer from './containers/StudentLessonContainer';
import CLessonContainer from './containers/CLessonContainer';
import TeacherFollowContainer from './containers/TeacherFollowContainer';
import LessonsToClassroomContainer from './containers/LessonsToClassroomContainer';
import EditUserContainer from './containers/EditUserContainer';
import StackQuestionMenu from './components/StackQuestionMenu';
import ReportContainer from './containers/ReportContainer';
import { autologin, logout } from './services/users'
import './index.css'
import {Helmet} from 'react-helmet';
import ToggleDarkMode from './components/DarkModeToggle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'semantic-ui-react'

class App extends Component {
  notifyLogOut = () => {
    toast.success("Logout Successful", {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  componentDidMount = () => {
    autologin().then(data => { this.props.setUser(data.data.attributes)})
    .catch(error => console.log(error))
  }

  logOut = () => {
    logout().then(() => {
      this.props.unsetUser()
      this.notifyLogOut()
      return <Redirect to='/' />
    })
  }

  render() {
    return (
      <div >
          <Helmet>
            <style>{`body { background-color: ${this.props.background}; }`}</style>
          </Helmet>
        <NavBar currentUser={this.props.currentUser} logOut={this.logOut}/>
        <StackQuestionMenu />
        <ToggleDarkMode />
        <Container textAlign='right' >
          <ToastContainer/>
        </Container>
        <Switch>

          <Route exact path="/" 
          render={routerProps => 
            <Home 
            {...routerProps} 
            currentUser={this.props.currentUser}/>} 
          />

          <Route exact path="/login" 
          render={routerProps => 
            <LoginForm 
            {...routerProps} 
            setUser={this.props.setUser}/>} 
          />

          <Route exact path="/signup" 
          render={routerProps => 
            <SignupForm 
            {...routerProps} 
            setUser={this.props.setUser}/>} 
          />

          <Route exact path="/classroom"
          render={routerProps =>
            <ClassroomContainer
            {...routerProps}
            currentUser={this.props.currentUser}/>}
          />

          <Route exact path="/editclassroom"
          render={routerProps =>
            <ClassroomEditContainer
            {...routerProps}
            currentUser={this.props.currentUser}/>}
          />
          
          <Route exact path="/lessons"
          render={routerProps =>
            <LessonsContainer
            {...routerProps}
            currentUser={this.props.currentUser}/>}
          />
          
          <Route exact path="/classroom-lesson"
          render={routerProps =>
            <StudentLessonContainer
            {...routerProps}
            currentUser={this.props.currentUser}/>}
          />

          <Route exact path="/complete-lesson"
          render={routerProps =>
            <CLessonContainer
            {...routerProps}
            currentUser={this.props.currentUser}/>}
          />

          <Route exact path="/teacher-follow"
          render={routerProps =>
            <TeacherFollowContainer
            {...routerProps}
            currentUser={this.props.currentUser}/>}
          />

        <Route exact path="/add-lesson"
          render={routerProps =>
            <LessonsToClassroomContainer
            {...routerProps}
            currentUser={this.props.currentUser}/>}
          />

        <Route exact path="/edit-user"
          render={routerProps =>
            <EditUserContainer
            {...routerProps}
            currentUser={this.props.currentUser}/>}
          />

        <Route exact path="/reports"
          render={routerProps =>
            <ReportContainer
            {...routerProps}
            currentUser={this.props.currentUser}/>}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  background: state.app.background
})

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({type: "SET_USER", user}),
  unsetUser: () => dispatch({type: "UNSET_USER"}),
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
