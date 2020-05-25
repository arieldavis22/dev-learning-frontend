import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { Button } from 'semantic-ui-react'


class TeacherHomeContainer extends Component {
    render() { 
        return (  
            <div>
                <NavLink to="/classroom" exact>
                    <Button icon='book' size='massive' content='Classrooms'/>
                </NavLink><br />
                <br/>
                <NavLink to="/lessons" exact>
                    <Button icon='file' size='massive' content='Lessons'/>
                </NavLink><br />
                <br/>
                <NavLink to="/teacher-follow" exact>
                    <Button icon='user' size='massive' content='See Following'/>
                </NavLink>
            </div>
        );
    }
}

export default TeacherHomeContainer;