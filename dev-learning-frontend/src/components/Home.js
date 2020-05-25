import React, { Component } from 'react';
import StudentHomeContainer from '../containers/StudentHomeContainer';
import FadeIn from 'react-fade-in';
import MainMenu from './MainMenu';
import { Container } from 'semantic-ui-react'
import TeacherHomeContainer from '../containers/TeacherHomeContainer';

class Home extends Component {
    render() { 
        console.log("CURRENT USER", this.props.currentUser)
        return (  
            <div>
                {!this.props.currentUser ? <MainMenu /> : null}
                {this.props.currentUser  ? 
                <div>
                    <FadeIn>
                        <Container textAlign='center'>
                            <h1>Welcome back, {this.props.currentUser.first_name} {this.props.currentUser.last_name}</h1> 
                        </Container>
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
                        <FadeIn>
                            <Container textAlign='center'>
                                <TeacherHomeContainer />
                            </Container>
                        </FadeIn>
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