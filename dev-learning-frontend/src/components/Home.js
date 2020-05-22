import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import StudentHomeContainer from '../containers/StudentHomeContainer';
import FadeIn from 'react-fade-in';
// import { Container } from 'semantic-ui-react'

class Home extends Component {
    render() { 
        console.log("CURRENT USER", this.props.currentUser)
        return (  
            <div>
                {/* <FadeIn>
                    <Container textAlign='center'>
                        Welcome to Dev Learning
                    </Container>
                    <Container textAlign='center'>
                        Dev Learning is an interactive online learning environment
                        aimed to help young individuals prepare for a career in
                        software development.
                    </Container>
                </FadeIn> */}
                {this.props.currentUser  ? 
                <div>
                    <FadeIn>
                    <h1>Welcome back, {this.props.currentUser.first_name}</h1> 
                    </FadeIn>
                    {this.props.currentUser.role === "Student" ? 
                    <div>
                        <FadeIn>
                        <StudentHomeContainer currentUser={this.props.currentUser}/>
                        </FadeIn>
                    </div>
                    : 
                    null}
                    {this.props.currentUser.role === "Teacher" ?
                    <div>
                        <NavLink to="/classroom" exact>
                            <button>Create New Class</button>
                        </NavLink>
                        <NavLink to="/lessons" exact>
                            <button>Create New Lesson</button>
                        </NavLink>
                        <NavLink to="/teacher-follow" exact>
                            <button>See Following</button>
                        </NavLink>
                    </div>
                    : 
                    null}
                </div>
                : null}
            </div>
        );
    }
}

export default Home;