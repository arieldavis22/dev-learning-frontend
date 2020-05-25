import React from 'react';
import {NavLink} from 'react-router-dom'
import FadeIn from 'react-fade-in';
import { Divider, Button } from 'semantic-ui-react'


const Lesson = ({ 
    id, 
    title, 
    edit, 
    handleClickLesson, 
    cLesson, 
    handleOnClickLesson, 
    lesson, 
    report ,
    handleSetLessonId,
    remove,
    removeLesson
}) => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return (  
        <div>
            <FadeIn>
            <h1>Lesson Name: {title}</h1>
            {remove ? <Button onClick={() => removeLesson(id)} size='medium' content='Delete Lesson'/> : null}
            {report ? 
            <div>
                <NavLink to='/reports' exact>
                    {/* <button onClick={() => handleSetLessonId(id)}>See Lesson Reports</button> */}
                    <Button onClick={() => handleSetLessonId(id)} icon='book' size='medium' content='See Lesson Reports'/>
                    <Divider />
                </NavLink>
            </div> 
            : null }
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
            </FadeIn>
        </div>
    );
}

export default Lesson;