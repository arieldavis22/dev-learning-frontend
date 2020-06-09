import React, { Component } from 'react';
import { connect } from 'react-redux';
import Classroom from '../components/Classroom';
import { addLessonToClassroom } from '../services/classrooms'
import { toast } from 'react-toastify';
import { Container } from 'semantic-ui-react'

class LessonsToClassroomContainer extends Component {

    componentDidMount() {
        // allClassooms(this.props.currentUser.id)
        fetch("http://localhost:3000/classroom-without-lesson", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                id: this.props.currentUser.id,
                lesson_id: this.props.lessonID
            })
        })
        .then(r => r.json())
        .then(data => {
            this.props.setAllClassrooms(data)
        })
    }

    notifyLessonToClassroom = () => {
        toast.success("Lesson Added", {
        position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    handleLessonToClassroom = (id) => {
        addLessonToClassroom(id, this.props.lessonID).then(() => {
            this.notifyLessonToClassroom()
            this.props.history.push('/')
        })
    }

    renderClassrooms = () => {
        if(this.props.allClassrooms) {
            return this.props.allClassrooms.map(classroom => 
                <Classroom 
                key={classroom.id} 
                id={classroom.id}
                name={classroom.name} 
                handleLessonToClassroom={this.handleLessonToClassroom}
                lesson={true}/>
            )
        }
    }

    
    render() { 
        console.log("LESSONS TO CLASSROOM:", this.props.allClassrooms)
        return (  
            <div>
                {!this.props.currentUser ? this.props.history.push('/') : null}
                <Container textAlign="center">
                    <h1>All Your Classrooms</h1>
                    {this.renderClassrooms()}
                </Container>
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