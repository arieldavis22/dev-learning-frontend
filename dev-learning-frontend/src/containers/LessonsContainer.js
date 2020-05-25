import React, { Component } from 'react';
import LessonForm from '../components/LessonForm';
import {connect} from 'react-redux'
import Lesson from '../components/Lesson';
import { NavLink } from 'react-router-dom';
import { allLessons } from '../services/lessons'

class LessonsContainer extends Component {

    componentDidMount() {
        this.fetchLessons()
    }

    fetchLessons = () => {
        allLessons(this.props.currentUser.id)
        .then(lessonData => {
            this.props.setTeacherLessons(lessonData)
        })
    }

    removeLesson = (id) => {
        fetch("http://localhost:3000/remove-lesson", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                lesson_id: id
            })
        })
        .then(r => r.json())
        .then(() => this.fetchLessons())
    }

    renderLessons = () => {
        return this.props.teacherLessons.map(lesson => 
            <Lesson key={lesson.id} id={lesson.id} title={lesson.title} remove={true} removeLesson={this.removeLesson}/>
        )
    }

    render() { 
        return (  
            <div>
                Lessosn container
                <LessonForm currentUser={this.props.currentUser}/>
                <NavLink to="/classroom" exact>
                    <button>Add A Lesson To A Class</button>
                </NavLink>
                {this.renderLessons()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    teacherLessons: state.teacher.teacherLessons
})

const mapDispatchToProps = dispatch => ({
    setTeacherLessons: lessons => dispatch({type: 'SET_TEACHER_LESSONS', lessons})
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonsContainer);