import React from 'react';
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { useAppSelector } from '../store/hooks';

const TeacherHomeContainer: React.FC = () => {
    const menu = useAppSelector(state => state.app.menu)

    return (
        <div>
            <NavLink to="/classroom">
                <Button color={menu ? 'purple' : undefined} icon='book' size='massive' content='Classrooms'/>
            </NavLink><br />
            <br/>
            <NavLink to="/lessons">
                <Button color={menu ? 'purple' : undefined} icon='file' size='massive' content='Lessons'/>
            </NavLink><br />
            <br/>
            <NavLink to="/teacher-follow">
                <Button color={menu ? 'purple' : undefined} icon='user' size='massive' content='See Following'/>
            </NavLink>
        </div>
    );
}

export default TeacherHomeContainer;