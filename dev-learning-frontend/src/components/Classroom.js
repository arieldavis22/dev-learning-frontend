import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import Student from './Student';
import Lesson from './Lesson';
import FadeIn from 'react-fade-in';
import { findStudents, findStudentGpa, removeStudent } from '../services/users'
import { findLessons } from '../services/lessons'
import { Virtuoso } from 'react-virtuoso'
import { Divider, Button } from 'semantic-ui-react'

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
        return <Virtuoso 
            style={{ width: '1046px', height: '200px', border: '5px dashed gray', borderRadius: '4px' }} 
            totalCount={1} 
            item={() => <div>
            {this.state.lessonsInClass.map(lesson => {
            return <Lesson 
            key={lesson.id} 
            id={lesson.id}
            title={lesson.title} 
            report={true}
            handleSetLessonId={this.handleSetLessonId}/>
        })}
        </div> } />
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
                <NavLink to="/classroom-lesson" exact> {/* eslint-disable-next-line */}
                    <Button color={this.props.menu ? 'purple' : null} onClick={() => setLessonState(id)} color={this.props.menu ? 'purple' : null} icon='book' size='big' content='Check Lessons'/>
                </NavLink>
            </div>
            :
            null}

            {render ?
                <div>
                <NavLink to="/editclassroom" exact>
                    {/* <button onClick={() => setInfo(name, id)}>Edit Classroom/Add Student/Lesson</button> */}
                    <Button color={this.props.menu ? 'purple' : null} onClick={() => setInfo(name, id)} icon='book' size='big' content='Edit Classroom/Add Student/Lesson'/>
                </NavLink>
                <Divider />
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
    currentUser: state.user.currentUser,
    menu: state.app.menu
})

const mapDispatchToProps = dispatch => ({
    setStudentsInClassroom: students => dispatch({type: "SET_STUDENTS_IN_CLASSROOMS", students}),
    setClassroomLessons: lessons => dispatch({type: "SET_CLASSROOM_LESSONS", lessons}),
    setLessonID: lessonId => dispatch({type: "SET_LESSON_ID", lessonId})

})

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);