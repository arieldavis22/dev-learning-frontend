import React, { Component } from 'react';
import { newClassroom } from '../services/classrooms'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

class ClassroomForm extends Component {
    state = {
        teacher_id: this.props.currentUser.id,
        name: ''
    }

    notifyClassroom = () => {
        toast.success("Classroom Created", {
        position: toast.POSITION.BOTTOM_RIGHT
        })
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
            this.notifyClassroom()
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
                <Form onSubmit={this.handleOnSubmit}>
                    <Form.Input icon='book' iconPosition='left' type="text" name="name" onChange={this.handleOnChange} placeholder="Classroom Name" />
                    <Button color={this.props.menu ? 'purple' : null} type='submit'>Create New Classroom</Button>
                </Form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    menu: state.app.menu
})

export default connect(mapStateToProps)(ClassroomForm);