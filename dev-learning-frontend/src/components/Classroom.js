import React from 'react';
import {NavLink} from 'react-router-dom'

const Classroom = ({ id, name, setInfo, renderClassroomStudents, student}) => {
    return (  
        <div>
            <h3>{name}</h3>
            {student ?  
            <div>
                <button>Check Lessons</button>
            </div>
            :
            <div>
                <NavLink to="/editclassroom" exact>
                    <button onClick={() => setInfo(name, id)}>Edit Classroom/Add Student</button>
                    {renderClassroomStudents(id)}
                </NavLink>
            </div>
            }
        </div>
    );
}

export default Classroom;