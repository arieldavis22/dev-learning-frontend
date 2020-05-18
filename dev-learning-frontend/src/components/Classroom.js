import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import Student from './Student';
import Lesson from './Lesson';

class Classroom extends Component {

    componentDidMount() {
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
            this.props.setStudentsInClassroom(data)
        })

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
            this.props.setClassroomLessons(data)
        })

    }


    renderStudents = () => {
        if(this.props.studentsInClassroom.data) {
            return this.props.studentsInClassroom.data.map(student => 
                <Student 
                key={student.attributes.id}
                first_name={student.attributes.first_name} 
                last_name={student.attributes.last_name}
                point_average={student.attributes.point_average}/>
            )
        }
    }

    renderLessons = () => {
        return this.props.classroomLessons.map(lesson => 
            <Lesson key={lesson.id} title={lesson.title} />
        )
    }



    render() { 
        const { id, name, setInfo, student, setLessonState, render, handleLessonToClassroom, lesson } = this.props
        return (  
            <div>

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

            </div>
        );
    }
}

const mapStateToProps = state => ({
    studentsInClassroom: state.studentsInClassroom,
    classroomLessons: state.classroomLessons,
    currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
    setStudentsInClassroom: students => dispatch({type: "SET_STUDENTS_IN_CLASSROOMS", students}),
    setClassroomLessons: lessons => dispatch({type: "SET_CLASSROOM_LESSONS", lessons})

})

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);