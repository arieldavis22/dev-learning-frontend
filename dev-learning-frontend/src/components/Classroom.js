import React from 'react';
import {NavLink} from 'react-router-dom'

const Classroom = ({ id, name, setInfo, renderClassroomStudents, student, setLessonState}) => {
    return (  
        <div>
            <h3>{name}</h3>
            {student ?  
            <div>
                <NavLink to="/classroom-lesson" exact>
                    <button onClick={() => setLessonState(id)}>Check Lessons</button>
                </NavLink>
            </div>
            :
            <div>
                <NavLink to="/editclassroom" exact>
                    <button onClick={() => setInfo(name, id)}>Edit Classroom/Add Student/Lesson</button>
                    {renderClassroomStudents(id)}
                </NavLink>
            </div>
            }
        </div>
    );
}

export default Classroom;