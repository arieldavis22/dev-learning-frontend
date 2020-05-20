import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import StudentHomeContainer from '../containers/StudentHomeContainer';

class Home extends Component {
    render() { 
        console.log("CURRENT USER", this.props.currentUser)
        return (  
            <div>
                Home
                {this.props.currentUser  ? <h1>Welcome back, {this.props.currentUser.first_name}</h1> : null}
                {this.props.currentUser.role === "Student" ? 
                <div>
                    <p>student</p>
                    <StudentHomeContainer currentUser={this.props.currentUser}/>
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
        );
    }
}

export default Home;