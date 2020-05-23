import React, { Component } from 'react';
import { newClassroom } from '../services/classrooms'

class ClassroomForm extends Component {
    state = {
        teacher_id: this.props.currentUser.id,
        name: ''
    }

    handleOnChange = event => {
        this.setState({
            teacher_id: this.props.currentUser.id,
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault()

        newClassroom(this.state)
        .then(classroomData => {
            this.props.fetchAllClassrooms()
            this.props.addClassroom(classroomData)
            this.setState({
                state: this.props.currentUser.id,
                name: ''
            })
        })
    }
    render() { 
        console.log("CURRENT STATE", this.state)
        return (  
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" name="name" onChange={this.handleOnChange} placeholder="Classroom Name" />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default ClassroomForm;