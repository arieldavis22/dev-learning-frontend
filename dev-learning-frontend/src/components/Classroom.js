import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import Student from './Student';
import Lesson from './Lesson';
import FadeIn from 'react-fade-in';

class Classroom extends Component {
    
    state = {
        studentsInClass: [],
        lessonsInClass: [],
        gpa: '',
    }

    fetchAllStudents = () => {
        fetch("http://localhost:3000/find-students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classroom_id: this.props.id
            })
        })
        .then(r => r.json())
        .then(data => {
            this.setState({
                studentsInClass: data.users
            })
            console.log("CLASSROOM DAAATA",data)
        })
    }

    componentDidMount() {
        this.fetchAllStudents()

        fetch("http://localhost:3000/find-lessons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classroom_id: this.props.id
            })
        })
        .then(r => r.json())
        .then(data => {
            this.setState({
                lessonsInClass: data
            })
        })

        fetch("http://localhost:3000/find-student-gpa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classroom_id: this.props.id,
                student_id: this.props.student_id
            })
        })
        .then(r => r.json())
        .then(data => {
            this.setState({
                gpa: data
            })
        })

    }

    handleRemoveFromClassroom = id => {
        fetch("http://localhost:3000/remove-student", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classroom_id: this.props.id,
                student_id: id
            })
        })
        .then(r => r.json())
        .then(() => this.fetchAllStudents())
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