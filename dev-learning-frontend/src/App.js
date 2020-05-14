import React, { Component } from 'react';
import Home from './components/Home';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import {Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar';
import {connect} from 'react-redux'

class App extends Component {

  componentDidMount = () => {
    fetch("http://localhost:3000/autologin", {
      credentials: 'include'
    })
    .then(r => {
      if(r.ok) {
        return r.json()
      } else{
        throw r
      }
    })
    .then(data => {
      this.props.setUser(data)
    })
    .catch(error => console.log(error))
  }

  logOut = () => {
    fetch("http://localhost:3000/tlogout", {
      method: "POST",
      credentials: 'include'
    })
    .then(r => r.json())
    .then(() => {
      this.props.unsetUser()
    })
  }

  render() {
    console.log("state is:", this.props.currentUser)
    return (
      <div >
        <NavBar currentUser={this.props.currentUser} logOut={this.logOut}/>
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
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({type: "SET_USER", user}),
  unsetUser: () => dispatch({type: "UNSET_USER"}),
  isTeacher: () => dispatch({type: "IS_TEACHER"})
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
