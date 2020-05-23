import React, { Component } from 'react';
import {connect} from 'react-redux'
import Student from '../components/Student'
import Lesson from '../components/Lesson';
import ClassroomEditForm from '../components/ClassroomEditForm';
import { allStudentsInClassroom } from '../services/users'
import { allLessonsForTeacher } from '../services/lessons'
import { addStudentToClassroom } from '../services/classrooms'
import { addLessonToClassroom } from '../services/classrooms'

class ClassroomEditContainer extends Component {

    componentDidMount() {
        this.fetchAllStudents()
        this.fetchAllLessons()
    }

    fetchAllStudents = () => {
        allStudentsInClassroom(this.props.classroomID)
        .then(studentData => {
            this.props.setStudents(studentData)
        })
    }

    fetchAllLessons = () => {
        allLessonsForTeacher(this.props.currentUser.id, this.props.classroomID)
        .then(lessonData => {
            this.props.setTeacherLessons(lessonData)
        })
    }

    handleClick = (id) => {
        addStudentToClassroom(this.props.classroomID, id)
        .then(() => this.fetchAllStudents())
    }

    handleClickLesson = (id) => {
        addLessonToClassroom(this.props.classroomID, id)
        .then(() => this.fetchAllLessons())
    }

    renderAllStudents = () => {
        if(this.props.allStudents.data) {
            return this.props.allStudents.data.map(student => <Student 
                key={student.attributes.id}
                id={student.attributes.id}
                first_name={student.attributes.first_name}
                last_name={student.attributes.last_name}
                addToClass={true}
                handleClick={this.handleClick}/>
            )
        }
    }

    renderAllTeacherLessons = () => {
        return this.props.teacherLessons.map(lesson => 
            <Lesson 
            key={lesson.id} 
            id={lesson.id}
            title={lesson.title}
            edit={true}
            handleClickLesson={this.handleClickLesson}/>
        )
    }

    render() { 
        console.log('CLASSROOM EDIT CONTAINER:', this.props.classroomName)
        return (  
            <div>
                Edit Classroom
                Name:
                <ClassroomEditForm 
                classroomName={this.props.classroomName}
                classroomID={this.props.classroomID}/>
                <h1>Students</h1>
                {this.renderAllStudents()}
                <h2>Lessons</h2>
                {this.renderAllTeacherLessons()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classroomName: state.classroom.classroomName,
    allStudents: state.student.allStudents,
    classroomID: state.classroom.classroomID,
    teacherLessons: state.teacher.teacherLessons
})

const mapDispatchToProps = dispatch => ({
    setStudents: students => dispatch({type: "SET_STUDENTS", students}),
    setTeacherLessons: lessons => dispatch({type: 'SET_TEACHER_LESSONS', lessons})
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomEditContainer);