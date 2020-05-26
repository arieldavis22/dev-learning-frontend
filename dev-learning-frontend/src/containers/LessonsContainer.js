import React, { Component } from 'react';
import LessonForm from '../components/LessonForm';
import {connect} from 'react-redux'
import Lesson from '../components/Lesson';
import { NavLink } from 'react-router-dom';
import { allLessons } from '../services/lessons'
import FadeIn from 'react-fade-in';
import { Container, Divider, Button } from 'semantic-ui-react'
import { Virtuoso } from 'react-virtuoso'

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
        return <Virtuoso 
        style={{ width: '1050px', height: '300px'}} 
        totalCount={1} 
        item={() => <div>
            {this.props.teacherLessons.map(lesson => {
                return <Lesson key={lesson.id} id={lesson.id} title={lesson.title} remove={true} removeLesson={this.removeLesson} menu={this.props.menu}/>
            })}
        </div>}/>
    }

    render() { 
        return (  
            <div>
                <FadeIn>
                    <Container textAlign='center'>
                        <LessonForm currentUser={this.props.currentUser} fetchLessons={this.fetchLessons}/>
                        <Divider />
                        <NavLink to="/classroom" exact>
                            {/* <button>Add A Lesson To A Class</button> */}
                            <Button color={this.props.menu ? 'purple' : null} >Add A Lesson To A Class</Button>
                        </NavLink>
                        {this.renderLessons()}
                    </Container>
                </FadeIn>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    teacherLessons: state.teacher.teacherLessons,
    menu: state.app.menu
})

const mapDispatchToProps = dispatch => ({
    setTeacherLessons: lessons => dispatch({type: 'SET_TEACHER_LESSONS', lessons})
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonsContainer);