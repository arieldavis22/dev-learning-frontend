import React, { Component } from 'react';
import { connect } from 'react-redux';
import Classroom from '../components/Classroom';

class LessonsToClassroomContainer extends Component {

    componentDidMount() {
        fetch("http://localhost:3000/all-classrooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                id: this.props.currentUser.id
            })
        })
        .then(r => r.json())
        .then(data => {
            this.props.setAllClassrooms(data)
        })
    }

    handleLessonToClassroom = (id) => {
        fetch("http://localhost:3000/lesson-classroom", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classroom_id: id,
                lesson_id: this.props.lessonID
            })
        })
        .then(r => r.json())
        .then(console.log)
    }

    renderClassrooms = () => {
        return this.props.allClassrooms.map(classroom => 
                <Classroom 
                key={classroom.id} 
                id={classroom.id}
                name={classroom.name} 
                handleLessonToClassroom={this.handleLessonToClassroom}
                lesson={true}/>
            )
    }

    
    render() { 
        console.log("LESSONS TO CLASSROOM:", this.props.allClassrooms)
        return (  
            <div>
                all classrooms
                {this.renderClassrooms()}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    lessonID: state.lesson.lessonID,
    allClassrooms: state.classroom.allClassrooms
})

const mapDispatchToProps = dispatch => ({
    setAllClassrooms: classrooms => dispatch({type: "SET_ALL_CLASSROOMS", classrooms})

})

export default connect(mapStateToProps, mapDispatchToProps)(LessonsToClassroomContainer);