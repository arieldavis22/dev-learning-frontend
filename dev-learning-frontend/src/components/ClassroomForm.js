import React, { Component } from 'react';

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
        fetch("http://localhost:3000/new-classroom", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(classroomData => {
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