import React, { Component } from 'react';
import {connect} from 'react-redux'
import Lesson from '../components/Lesson';
import { findLessons } from '../services/lessons'
import { Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import { Virtuoso } from 'react-virtuoso'
import FadeIn from 'react-fade-in';


class StudentLessonContainer extends Component {
    state = {  }

    componentDidMount() {
        findLessons(this.props.classroomID, this.props.currentUser.id)
        .then(data => {
            this.props.setClassroomLessons(data)
        })
    }

    handleOnClickLesson = (lesson) => {
        this.props.setCLesson(lesson)
    }

    renderLessons = () => {
        return <Virtuoso 
        style={{ width: '1050px', height: '300px' }} 
        totalCount={1} 
        item={() => <div>
            {this.props.classroomLessons.map(lesson => {
                return <Lesson 
                key={lesson.id} 
                title={lesson.title} 
                cLesson={true} 
                handleOnClickLesson={this.handleOnClickLesson}
                lesson={lesson}/>
            })}
        </div>}/>
    }
    render() { 
        console.log("ST CONTAINER:", this.props.currentUser.id)
        return (  
            <div>
                {!this.props.currentUser ? <Redirect to="/" /> : null}
                <FadeIn>
                    <Container textAlign='center'>
                        <h1>All Classroom Lessons</h1>
                        {this.renderLessons()}
                    </Container>
                </FadeIn>
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