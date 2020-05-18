import React from 'react';
import {NavLink} from 'react-router-dom'

const Lesson = ({ id, title, edit, handleClickLesson, cLesson, handleOnClickLesson, lesson }) => {
    return (  
        <div>
            <h1>{title}</h1>
            {cLesson ? 
            <div>
                <NavLink to="/complete-lesson" exact>
                    <button onClick={() => handleOnClickLesson(lesson)}>Complete Lesson</button> 
                </NavLink>
            </div>
            : 
            null}
            {edit ? <button onClick={() => handleClickLesson(id)}>Add To Class</button> : null}
        </div>
    );
}

export default Lesson;