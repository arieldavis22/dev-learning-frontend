import React, { Component } from 'react';
import { newLesson } from '../services/lessons'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';

class LessonForm extends Component {
    state = {  
        teacher_id: this.props.currentUser.id,
        title: '',
        points_worth: '',
        deadline: '',
        return_value: '',
        description: '',
        boilerplate: '',
        language: ''
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault()
        newLesson(this.state).then(() => this.props.fetchLessons())
    }

    render() { 
        // console.log(this.props)
        return (  
            <div>
                <h1>Create a New Lesson</h1>
                <Form onSubmit={this.handleOnSubmit}>
                    <Form.Input icon='book' iconPosition='left' type="text" placeholder="Title" name="title" onChange={this.handleOnChange}   />
                    <Form.Input icon='book' iconPosition='left' type="number" placeholder="Points Worth" name="points_worth" onChange={this.handleOnChange}   />
                    <Form.Input icon='book' iconPosition='left' type="date" placeholder="Deadline" name="deadline" onChange={this.handleOnChange}   />
                    <Form.Input type="radio" label='JavaScript' name="language" value="63" onChange={this.handleOnChange}   />
                    <Form.Input type="radio" label='Ruby' name="language" value="72" onChange={this.handleOnChange}   />
                    <Form.Input icon='book' iconPosition='left' type="text" placeholder="Expected Return Value" name="return_value" onChange={this.handleOnChange}   />
                    <Form.TextArea placeholder="Description" name="description" onChange={this.handleOnChange}   />
                    <Form.TextArea placeholder="Boilerplate" name="boilerplate" onChange={this.handleOnChange}   />
                    <Button color={this.props.menu ? 'purple' : null} type='submit'>Create New Lesson</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    menu: state.app.menu
})

export default connect(mapStateToProps)(LessonForm);