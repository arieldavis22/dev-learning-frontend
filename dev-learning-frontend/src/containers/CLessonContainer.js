import React, { Component } from 'react';
import { connect } from 'react-redux';
import CLessonForm from '../components/CLessonForm';
import FadeIn from 'react-fade-in';

class CLessonContainer extends Component {
    state = {  }

    render() { 
        console.log("CLesson COntainer:", this.props)
        const { title, description, boilerplate, return_value, points, deadline } = this.props.CLesson
        return (  
            <div>
                <FadeIn>
                <h1>{title}</h1>
                <p>{description}</p>
                <h5>Points worth: {points}</h5>
                <h5>Deadline: {deadline}</h5>
                <CLessonForm 
                boilerplate={boilerplate} 
                return_value={return_value} 
                points={points}
                classroomID={this.props.classroomID}
                student_id={this.props.currentUser.id}/>
                </FadeIn>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    CLesson: state.lesson.CLesson,
    classroomID: state.classroom.classroomID
})

export default connect(mapStateToProps)(CLessonContainer);