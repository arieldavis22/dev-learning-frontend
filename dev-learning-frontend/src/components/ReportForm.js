import React, { Component } from 'react';
import { reportLesson } from '../services/lessons'

class ReportForm extends Component {
    state = {  
        lesson_id: this.props.lesson_id,
        title: '',
        message: ''
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        reportLesson(this.state).then(console.log)
    }
    render() { 
        return (  
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="title" placeholder="Title" onChange={this.handleOnChange}/>
                    <input type="text" name="message" placeholder="message" onChange={this.handleOnChange}/>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default ReportForm;