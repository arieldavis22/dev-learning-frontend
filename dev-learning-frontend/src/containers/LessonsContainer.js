import React, { Component } from 'react';
import LessonForm from '../components/LessonForm';
import {connect} from 'react-redux'
import Lesson from '../components/Lesson';
import { NavLink } from 'react-router-dom';

class LessonsContainer extends Component {
    state = {  }

    componentDidMount() {
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

    renderLessons = () => {
        return this.props.teacherLessons.map(lesson => 
            <Lesson key={lesson.id} title={lesson.title}/>
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
    teacherLessons: state.teacherLessons
})

const mapDispatchToProps = dispatch => ({
    setTeacherLessons: lessons => dispatch({type: 'SET_TEACHER_LESSONS', lessons})
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonsContainer);