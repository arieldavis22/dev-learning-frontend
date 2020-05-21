import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
class Teacher extends Component {
    state = {  
        lessons: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/all-lessons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                teacher_id: this.props.id
            })
        })
        .then(r => r.json())
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
                        <h3>{lesson.title}</h3>
                        <p>{lesson.description}</p>
                        <NavLink to="/add-lesson" exact>
                            <button onClick={() => this.handleID(lesson.id)}>Add Lesson</button>
                        </NavLink>
                    </div>
                    )}
                </div> 
                : 
                null}
                {notFollowed ? <button onClick={() => handleTeacherFollow(id)}>Follow</button> : null }
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