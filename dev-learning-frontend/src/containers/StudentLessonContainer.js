import React, { Component } from 'react';
import {connect} from 'react-redux'
import Lesson from '../components/Lesson';

class StudentLessonContainer extends Component {
    state = {  }

    componentDidMount() {
        fetch("http://localhost:3000/find-lessons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classroom_id: this.props.classroomID
            })
        })
        .then(r => r.json())
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
        console.log("ST CONTAINER:", this.props.classroomID)
        return (  
            <div>
                Lessons
                {this.renderLessons()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classroomID: state.classroomID,
    classroomLessons: state.classroomLessons
})

const mapDispatchToProps = dispatch => ({
    setClassroomLessons: lessons => dispatch({type: "SET_CLASSROOM_LESSONS", lessons}),
    setCLesson: lesson => dispatch({type: "SET_C_LESSON", lesson})
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentLessonContainer);