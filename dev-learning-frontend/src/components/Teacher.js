import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { allTeacherLessons } from '../services/users'
import { Divider } from 'semantic-ui-react'
class Teacher extends Component {
    state = {  
        lessons: []
    }

    componentDidMount() {
        allTeacherLessons(this.props.id)
        .then(data => {
            this.setState({
                lessons: data
            })
        })
    }

    handleID = (id) => {
        this.props.setLessonID(id)
    }

    render() { 
        const { id, first_name, last_name, handleTeacherFollow, notFollowed, follow } = this.props
        return (  
            <div>
                <h2>{first_name}, {last_name}</h2> 
                {follow ? 
                <div>
                    {this.state.lessons.map(lesson => 
                    <div>
                        <h3>Title: {lesson.title}</h3>
                        <p>Description: {lesson.description}</p>
                        <NavLink to="/add-lesson" exact>
                            <button onClick={() => this.handleID(lesson.id)}>Add Lesson</button>
                        </NavLink>
                    </div>
                    )}
                    <Divider/>
                </div> 
                : 
                null}
                {notFollowed ? 
                <div>
                    <button onClick={() => handleTeacherFollow(id)}>Follow</button>
                    <Divider/>
                </div> : null }
            </div>
        );
    }
}
const mapStateToProps = state => ({
    lessonID: state.lesson.lessonID
})

const mapDispatchToProps = dispatch => ({
    setLessonID: lessonId => dispatch({type: "SET_LESSON_ID", lessonId})

})

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);