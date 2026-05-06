import React, { useEffect } from 'react';
import Classroom from '../components/Classroom';
import { addLessonToClassroom } from '../services/classrooms'
import { toast } from 'react-toastify';
import { Container } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setAllClassrooms } from '../store/classroomSlice';

const LessonsToClassroomContainer: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const lessonID = useAppSelector(state => state.lesson.lessonID);
    const allClassrooms = useAppSelector(state => state.classroom.allClassrooms);
    const currentUser = useAppSelector(state => state.user.currentUser);

    useEffect(() => {
        if (!currentUser) return;

        fetch("http://localhost:3000/classroom-without-lesson", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                id: (currentUser as any).id,
                lesson_id: lessonID
            })
        })
            .then(r => r.json())
            .then(data => {
                dispatch(setAllClassrooms(data))
            })
    }, [currentUser, lessonID, dispatch])

    const notifyLessonToClassroom = () => {
        toast.success("Lesson Added", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const handleLessonToClassroom = (id: string) => {
        addLessonToClassroom(id, lessonID).then(() => {
            notifyLessonToClassroom()
            navigate('/')
        })
    }

    const renderClassrooms = () => {
        if (allClassrooms) {
            return allClassrooms.map((classroom: any) => 
                <Classroom 
                    key={classroom.id} 
                    id={classroom.id}
                    name={classroom.name} 
                    handleLessonToClassroom={handleLessonToClassroom}
                    lesson={true}/>
            )
        }
    }

    if (!currentUser) {
        navigate('/');
        return null;
    }

    return (
        <div>
            <Container textAlign="center">
                <h1>All Your Classrooms</h1>
                {renderClassrooms()}
            </Container>
        </div>
    );
}

export default LessonsToClassroomContainer;