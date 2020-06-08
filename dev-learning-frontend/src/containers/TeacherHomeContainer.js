import React from 'react';
import {NavLink} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { useSelector } from 'react-redux';

const TeacherHomeContainer = () => {
    const menu = useSelector(state => state.app.menu)
    return (  
        <div>
        <NavLink to="/classroom" exact>
            <Button color={menu ? 'purple' : null} icon='book' size='massive' content='Classrooms'/>
        </NavLink><br />
        <br/>
        <NavLink to="/lessons" exact>
            <Button color={menu ? 'purple' : null} icon='file' size='massive' content='Lessons'/>
        </NavLink><br />
        <br/>
        <NavLink to="/teacher-follow" exact>
            <Button color={menu ? 'purple' : null} icon='user' size='massive' content='See Following'/>
        </NavLink>
    </div>
    );
}

export default TeacherHomeContainer;