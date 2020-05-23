import React, { Component } from 'react';
import { connect } from 'react-redux';
import Classroom from '../components/Classroom';
import { allClassooms, addLessonToClassroom } from '../services/classrooms'

class LessonsToClassroomContainer extends Component {

    componentDidMount() {
        allClassooms(this.props.currentUser.id)
        .then(data => {
            this.props.setAllClassrooms(data)
        })
    }

    handleLessonToClassroom = (id) => {
        addLessonToClassroom(id, this.props.lessonID).then(console.log)
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
        // console.log("LESSONS TO CLASSROOM:", this.props.allClassrooms)
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