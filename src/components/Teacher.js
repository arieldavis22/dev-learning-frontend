import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { allTeacherLessons } from '../services/users'
import { Divider, Button } from 'semantic-ui-react'

const Teacher = (props) => {
    const [lessons, setLessons] = useState([])
    const { id, first_name, last_name, handleTeacherFollow, notFollowed, follow } = props
    const menu = useSelector(state => state.app.menu)
    const dispatch = useDispatch()
    const setLessonID = lessonId => dispatch({type: "SET_LESSON_ID", lessonId})

    useEffect(() => {
        allTeacherLessons(props.id)
        .then(setLessons)
        // .then(data => setLessons(data))
    }, [props.id])

    const handleID = (id) => {
            setLessonID(id)
        }
    return (  
            <div>
                <h2>{first_name}, {last_name}</h2> 
                {follow ? 
                <div>
                    {lessons.map(lesson => 
                    <div>
                        <h3>Title: {lesson.title}</h3>
                        <p>Description: {lesson.description}</p>
                        <NavLink to="/add-lesson" exact>
                            <Button color={menu ? 'purple' : null} onClick={() => handleID(lesson.id)}>Add Lesson</Button>
                        </NavLink>
                    </div>)}

                    <Divider/>

                </div> 
                : null}

                {notFollowed ? 
                <div>
                    <Button color={menu ? 'purple' : null} onClick={() => handleTeacherFollow(id)}>Follow</Button>
                    <Divider/>
                </div> : null }
            </div>
    );
}

export default Teacher;