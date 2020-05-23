import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import Student from './Student';
import Lesson from './Lesson';
import FadeIn from 'react-fade-in';
import { findStudents, findStudentGpa, removeStudent } from '../services/users'
import { findLessons } from '../services/lessons'

class Classroom extends Component {
    
    state = {
        studentsInClass: [],
        lessonsInClass: [],
        gpa: '',
    }

    fetchAllStudents = () => {
        findStudents(this.props.id)
        .then(data => {
            this.setState({
                studentsInClass: data.users
            })
        })
    }

    componentDidMount() {
        this.fetchAllStudents()

        findLessons(this.props.id)
        .then(data => {
            this.setState({
                lessonsInClass: data
            })
        })

        findStudentGpa(this.props.id, this.props.student_id)
        .then(data => {
            this.setState({
                gpa: data
            })
        })
    }

    handleRemoveFromClassroom = id => {
        removeStudent(this.props.id, id).then(() => this.fetchAllStudents())
    }

    handleSetLessonId = id => {
        this.props.setLessonID(id)
    }


    renderStudents = () => {
        if(this.state.studentsInClass.data) {
            return this.state.studentsInClass.data.map(student => 
                <Student 
                key={student.attributes.id}
                id={student.attributes.id}
                first_name={student.attributes.first_name} 
                last_name={student.attributes.last_name}
                remove={true}
                handleRemoveFromClass={this.handleRemoveFromClassroom}
                classroom_id={this.props.id}/>
            )
        }
    }

    renderLessons = () => {
        return this.state.lessonsInClass.map(lesson => 
            <Lesson 
            key={lesson.id} 
            id={lesson.id}
            title={lesson.title} 
            report={true}
            handleSetLessonId={this.handleSetLessonId}/>
        )
    }



    render() { 
        const { id, name, setInfo, student, setLessonState, render, handleLessonToClassroom, lesson } = this.props
        return (  
            <div>
                <FadeIn>
            <h3>Classroom Name: {name}</h3>
            {this.props.currentUser.role === "Student" ? null : 
            
            <div>
                <h4>Students</h4>
                {this.renderStudents()}
                <h4>Lessons</h4>
                {this.renderLessons()}
            </div>
            }

            {lesson ? <button onClick={() => handleLessonToClassroom(id)}>Add</button> : null}


            {student ?  
            <div>
                <p>Grade: {this.state.gpa} </p>
                <NavLink to="/classroom-lesson" exact>
                    <button onClick={() => setLessonState(id)}>Check Lessons</button>
                </NavLink>
            </div>
            :
            null}

            {render ?
                <div>
                <NavLink to="/editclassroom" exact>
                    <button onClick={() => setInfo(name, id)}>Edit Classroom/Add Student/Lesson</button>
                </NavLink>
            </div>
            :
            null}
                </FadeIn>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studentsInClassroom: state.student.studentsInClassroom,
    classroomLessons: state.classroom.classroomLessons,
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setStudentsInClassroom: students => dispatch({type: "SET_STUDENTS_IN_CLASSROOMS", students}),
    setClassroomLessons: lessons => dispatch({type: "SET_CLASSROOM_LESSONS", lessons}),
    setLessonID: lessonId => dispatch({type: "SET_LESSON_ID", lessonId})

})

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);