import React, { Component } from 'react';
import {connect} from 'react-redux'
import Lesson from '../components/Lesson';
import { findLessons } from '../services/lessons'
import { Redirect } from 'react-router-dom';


class StudentLessonContainer extends Component {
    state = {  }

    componentDidMount() {
        findLessons(this.props.classroomID)
        .then(data => {
            this.props.setClassroomLessons(data)
        })
    }

    handleOnClickLesson = (lesson) => {
        this.props.setCLesson(lesson)
    }

    renderLessons = () => {
        return this.props.classroomLessons.map(lesson => 
            <Lesson 
            key={lesson.id} 
            title={lesson.title} 
            cLesson={true} 
            handleOnClickLesson={this.handleOnClickLesson}
            lesson={lesson}/>
        )
    }
    render() { 
        // console.log("ST CONTAINER:", this.props.classroomID)
        return (  
            <div>
                {!this.props.currentUser ? <Redirect to="/" /> : null}
                Lessons
                {this.renderLessons()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classroomID: state.classroom.classroomID,
    classroomLessons: state.lesson.classroomLessons
})

const mapDispatchToProps = dispatch => ({
    setClassroomLessons: lessons => dispatch({type: "SET_CLASSROOM_LESSONS", lessons}),
    setCLesson: lesson => dispatch({type: "SET_C_LESSON", lesson})
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentLessonContainer);