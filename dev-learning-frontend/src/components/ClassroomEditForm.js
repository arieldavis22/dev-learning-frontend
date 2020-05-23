import React, { Component } from 'react';
import { editClassroom } from '../services/classrooms'

class ClassroomEditForm extends Component {
    state = {  
        name: '',
        classroom_id: this.props.classroomID
    }

    componentDidMount() {
        this.setState({
            name: this.props.classroomName
        })
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault()

        editClassroom(this.state).then(console.log)
    }
    render() { 
        console.log("CLASSROOM EDIT:", this.state)
        return (  
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" name="name" placeholder="Enter New Name" onChange={this.handleOnChange} />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default ClassroomEditForm;