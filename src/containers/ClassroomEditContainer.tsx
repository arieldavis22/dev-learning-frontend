import React, { useEffect } from 'react';
import Student from '../components/Student'
import Lesson from '../components/Lesson';
import ClassroomEditForm from '../components/ClassroomEditForm';
import { allStudentsInClassroom } from '../services/users'
import { allLessonsForTeacher } from '../services/lessons'
import { addStudentToClassroom } from '../services/classrooms'
import { addLessonToClassroom } from '../services/classrooms'
import FadeIn from 'react-fade-in';
import { Container } from 'semantic-ui-react'
import { toast } from 'react-toastify';
import { Virtuoso } from 'react-virtuoso'
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setStudents } from '../store/studentSlice';
import { setTeacherLessons } from '../store/teacherSlice';

const ClassroomEditContainer: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const classroomName = useAppSelector(state => state.classroom.classroomName);
    const allStudents = useAppSelector(state => state.student.allStudents);
    const classroomID = useAppSelector(state => state.classroom.classroomID);
    const teacherLessons = useAppSelector(state => state.teacher.teacherLessons);
    const currentUser = useAppSelector(state => state.user.currentUser);
    const menu = useAppSelector(state => state.app.menu);

    useEffect(() => {
        fetchAllStudents()
        fetchAllLessons()
    }, [])

    const fetchAllStudents = () => {
        allStudentsInClassroom(classroomID)
            .then(studentData => {
                dispatch(setStudents(studentData))
            })
    }

    const fetchAllLessons = () => {
        allLessonsForTeacher((currentUser as any).id, classroomID)
            .then(lessonData => {
                dispatch(setTeacherLessons(lessonData))
            })
    }

    const notifyAddToClass = () => {
        toast.success("Student Added", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const handleClick = (id: string) => {
        addStudentToClassroom(classroomID, id)
            .then(() => {
                fetchAllStudents()
                notifyAddToClass()
            })
    }

    const handleClickLesson = (id: string) => {
        addLessonToClassroom(classroomID, id)
            .then(() => fetchAllLessons())
    }

    const renderAllStudents = () => {
        if ((allStudents as any).data) {
            return <Virtuoso 
                style={{ width: '1050px', height: '400px' }} 
                totalCount={1} 
                item={() => <div>
                    {(allStudents as any).data.map((student: any) => {
                        return <Student 
                            key={student.attributes.id}
                            id={student.attributes.id}
                            first_name={student.attributes.first_name}
                            last_name={student.attributes.last_name}
                            addToClass={true}
                            handleClick={handleClick}/>
                    })}
                </div>}/>
        }
    }

    const renderAllTeacherLessons = () => {
        return teacherLessons.map((lesson: any) => 
            <Lesson 
                key={lesson.id} 
                id={lesson.id}
                title={lesson.title}
                edit={true}
                handleClickLesson={handleClickLesson}
                menu={menu}/>
        )
    }

    if (!currentUser) {
        navigate('/');
        return null;
    }

    return (
        <div>
            <FadeIn>
                <Container textAlign='center'>
                    <ClassroomEditForm 
                        classroomName={classroomName}
                        classroomID={classroomID}/>
                    <h1>Students</h1>
                    {renderAllStudents()}
                    <h2>Lessons</h2>
                    {renderAllTeacherLessons()}
                </Container>
            </FadeIn>
        </div>
    );
}

export default ClassroomEditContainer;