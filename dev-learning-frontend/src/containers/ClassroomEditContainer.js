import React, { Component } from 'react';
import {connect} from 'react-redux'
import Student from '../components/Student'
import Lesson from '../components/Lesson';
import ClassroomEditForm from '../components/ClassroomEditForm';

class ClassroomEditContainer extends Component {
    componentDidMount() {
        fetch("http://localhost:3000/all-students", {
            credentials: "include"
        })
        .then(r => r.json())
        .then(studentData => {
            this.props.setStudents(studentData)
        })

        fetch("http://localhost:3000/all-lessons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                teacher_id: this.props.currentUser.id
            })
        })
        .then(r => r.json())
        .then(lessonData => {
            this.props.setTeacherLessons(lessonData)
        })
    }

    handleClick = (id) => {
        fetch("http://localhost:3000/add-student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classroom_id: this.props.classroomID,
                student_id: id
            })
        })
        .then(r => r.json())
        .then(console.log)
    }

    handleClickLesson = (id) => {
        fetch("http://localhost:3000/lesson-classroom", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classroom_id: this.props.classroomID,
                lesson_id: id
            })
        })
        .then(r => r.json())
        .then(console.log)
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
    classroomName: state.classroomName,
    allStudents: state.allStudents,
    classroomID: state.classroomID,
    teacherLessons: state.teacherLessons
})

const mapDispatchToProps = dispatch => ({
    setStudents: students => dispatch({type: "SET_STUDENTS", students}),
    setTeacherLessons: lessons => dispatch({type: 'SET_TEACHER_LESSONS', lessons})
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomEditContainer);