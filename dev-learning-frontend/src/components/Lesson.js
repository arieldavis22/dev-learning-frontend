import React from 'react';
import {NavLink} from 'react-router-dom'

const Lesson = ({ id, title, edit, handleClickLesson, cLesson, handleOnClickLesson, lesson }) => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today > lesson.deadline)
    return (  
        <div>
            <h1>Lesson Name: {title}</h1>
            {cLesson ? 
            <div>
                {today > lesson.deadline ? 
                <div>
                    <button>Past Deadline</button>
                </div>
                : 
                <div>
                    <NavLink to="/complete-lesson" exact>
                        <button onClick={() => handleOnClickLesson(lesson)}>Complete Lesson</button> 
                    </NavLink>
                </div>
                }
            </div>
            : 
            null}
            {edit ? <button onClick={() => handleClickLesson(id)}>Add To Class</button> : null}
        </div>
    );
}

export default Lesson;