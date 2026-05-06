import React, { useEffect } from 'react';
import LessonForm from '../components/LessonForm';
import Lesson from '../components/Lesson';
import { NavLink, useNavigate } from 'react-router-dom';
import { allLessons } from '../services/lessons'
import FadeIn from 'react-fade-in';
import { Container, Divider, Button } from 'semantic-ui-react'
import { Virtuoso } from 'react-virtuoso'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTeacherLessons } from '../store/teacherSlice';

const LessonsContainer: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const teacherLessons = useAppSelector(state => state.teacher.teacherLessons);
    const currentUser = useAppSelector(state => state.user.currentUser);
    const menu = useAppSelector(state => state.app.menu);

    useEffect(() => {
        fetchLessons()
    }, [])

    const fetchLessons = () => {
        if (!currentUser) return;

        allLessons((currentUser as any).id)
            .then(lessonData => {
                dispatch(setTeacherLessons(lessonData))
            })
    }

    const removeLesson = (id: string) => {
        fetch("http://localhost:3000/remove-lesson", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                lesson_id: id
            })
        })
            .then(r => r.json())
            .then(() => fetchLessons())
    }

    const renderLessons = () => {
        return <Virtuoso 
            style={{ width: '1050px', height: '300px' }} 
            totalCount={1} 
            item={() => <div>
                {teacherLessons.map((lesson: any) => {
                    return <Lesson key={lesson.id} id={lesson.id} title={lesson.title} remove={true} removeLesson={removeLesson} menu={menu} />
                })}
            </div>}/>
    }

    if (!currentUser) {
        navigate('/');
        return null;
    }

    return (
        <div>
            <FadeIn>
                <Container textAlign='center'>
                    <LessonForm currentUser={currentUser} fetchLessons={fetchLessons}/>
                    <Divider />
                    <NavLink to="/classroom">
                        <Button color={menu ? 'purple' : undefined} >Add A Lesson To A Class</Button>
                    </NavLink>
                    {renderLessons()}
                </Container>
            </FadeIn>
        </div>
    );
}

export default LessonsContainer;