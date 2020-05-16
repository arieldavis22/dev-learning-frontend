import React, { Component } from 'react';
import ClassroomForm from '../components/ClassroomForm'
import {connect} from 'react-redux'
import Classroom from '../components/Classroom';
class ClassroomContainer extends Component {

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
        .then(classroomData => {
            console.log("CLASSROOM DATA", classroomData)
            this.props.setClassroom(classroomData)
        })
    }

    renderClassrooms = () => {
        if(this.props.classroom) {
            return this.props.classroom.map(classroom => <Classroom key={classroom.id} name={classroom.name}/>)
        }
    }


    render() { 
        console.log("CLASSROOMS ALL:", this.props.classroom)
        return (  
            <div>
                <ClassroomForm 
                currentUser={this.props.currentUser}
                addClassroom={this.props.addClassroom}/>
                {this.renderClassrooms()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classroom: state.classroom
})

const mapDispatchToProps = dispatch => ({
    setClassroom: classroom => dispatch({type: "SET_CLASSROOM", classroom}),
    addClassroom: classroom => dispatch({type: "ADD_CLASSROOM", classroom})
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomContainer);