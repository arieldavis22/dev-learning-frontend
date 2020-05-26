import React, { Component } from 'react';
import { editClassroom } from '../services/classrooms'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';

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
                <Form onSubmit={this.handleOnSubmit}>
                    <Form.Input type="text" name="name" placeholder="Enter New Name" onChange={this.handleOnChange} />
                    <Button color={this.props.menu ? 'purple' : null} type='submit'>Change Classroom Name</Button>
                </Form>
                {/* <form onSubmit={this.handleOnSubmit}>
                    <input type="text" name="name" placeholder="Enter New Name" onChange={this.handleOnChange} />
                    <input type="submit" />
                </form> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    menu: state.app.menu
})

export default connect(mapStateToProps)(ClassroomEditForm);