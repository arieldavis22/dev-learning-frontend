import React, { useEffect } from 'react';
import Lesson from '../components/Lesson';
import { findLessons } from '../services/lessons'
import { useNavigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import { Virtuoso } from 'react-virtuoso'
import FadeIn from 'react-fade-in';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setClassroomLessons, setCLesson } from '../store/lessonSlice';

interface StudentLessonContainerProps {
    currentUser: any;
}

const StudentLessonContainer: React.FC<StudentLessonContainerProps> = ({ currentUser }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const classroomID = useAppSelector(state => state.classroom.classroomID);
    const classroomLessons = useAppSelector(state => state.lesson.classroomLessons);

    useEffect(() => {
        if (!currentUser?.id) return;

        findLessons(classroomID, currentUser.id)
            .then(data => {
                dispatch(setClassroomLessons(data))
            })
    }, [classroomID, currentUser?.id, dispatch])

    const handleOnClickLesson = (lesson: any) => {
        dispatch(setCLesson(lesson))
    }

    const renderLessons = () => {
        return <Virtuoso 
            style={{ width: '1050px', height: '300px' }} 
            totalCount={1} 
            item={() => <div>
                {classroomLessons.map((lesson: any) => {
                    return <Lesson 
                        key={lesson.id} 
                        title={lesson.title} 
                        cLesson={true} 
                        handleOnClickLesson={handleOnClickLesson}
                        lesson={lesson}/>
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
                    <h1>All Classroom Lessons</h1>
                    {renderLessons()}
                </Container>
            </FadeIn>
        </div>
    );
}

export default StudentLessonContainer;