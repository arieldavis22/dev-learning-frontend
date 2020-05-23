import React, { Component } from 'react';
import { newLesson } from '../services/lessons'

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
        newLesson(this.state).then(console.log)
    }

    render() { 
        // console.log(this.props)
        return (  
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" placeholder="Title" name="title" onChange={this.handleOnChange} /> <br />
                    <input type="number" placeholder="Points Worth" name="points_worth" onChange={this.handleOnChange} /><br />
                    <input type="date" placeholder="Deadline" name="deadline" onChange={this.handleOnChange} /><br />
                    <input type="radio" id='JS' name="language" value="63" onChange={this.handleOnChange} />
                    <label htmlFor="JS">JavaScript</label><br />
                    <input type="radio" id='RB' name="language" value="72" onChange={this.handleOnChange} />
                    <label htmlFor="RB">Ruby</label><br />
                    <input type="text" placeholder="Expected Return Value" name="return_value" onChange={this.handleOnChange} /><br />
                    <textarea placeholder="Description" name="description" onChange={this.handleOnChange} /><br />
                    <textarea placeholder="Boilerplate" name="boilerplate" onChange={this.handleOnChange} /><br />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default LessonForm;