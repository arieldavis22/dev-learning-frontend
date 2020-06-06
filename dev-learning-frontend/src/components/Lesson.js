import React from 'react';
import {NavLink} from 'react-router-dom'
import FadeIn from 'react-fade-in';
import { Divider, Button } from 'semantic-ui-react'
import { useSelector } from 'react-redux';

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
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    const menu = useSelector(state => state.app.menu)
    return (  
        <div>
            <FadeIn>
            <h1>Lesson Name: {title}</h1>

            {remove ? 
            <div>
                <Button color={menu ? 'purple' : null} onClick={() => removeLesson(id)} size='medium' content='Delete Lesson'/>
                <Divider/>
            </div> : null}

            {report ? 
            <div>
                <NavLink to='/reports' exact>
                    <Button color={menu ? 'purple' : null} onClick={() => handleSetLessonId(id)} icon='book' size='medium' content='See Lesson Reports'/>
                    <Divider />
                </NavLink>
            </div> : null }

            {cLesson ? 
            <div>
                {today > lesson.deadline ? 
                    <div>
                        <button>Past Deadline</button>
                        <Button color='red'>Past Deadline</Button>
                    </div>
                    : 
                    <div>
                        <NavLink to="/complete-lesson" exact>
                            <Button color={menu ? 'purple' : null} onClick={() => handleOnClickLesson(lesson)}>Complete Lesson</Button>
                        </NavLink>
                    </div>
                }
            </div>: null}

            {edit ? <Button color={menu ? 'purple' : null} onClick={() => handleClickLesson(id)} >Add Lesson To Class</Button>
            : null}
            
            </FadeIn>
        </div>
    );
}

export default Lesson;