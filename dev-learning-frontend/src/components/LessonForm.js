import React, { Component } from 'react';

class LessonForm extends Component {
    state = {  
        teacher_id: this.props.currentUser.id,
        title: '',
        points_worth: '',
        deadline: '',
        return_value: '',
        description: '',
        boilerplate: ''
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault()
        fetch("http://localhost:3000/newlesson", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(console.log)
    }
    render() { 
        console.log(this.state)
        return (  
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" placeholder="Title" name="title" onChange={this.handleOnChange} /> <br />
                    <input type="number" placeholder="Points Worth" name="points_worth" onChange={this.handleOnChange} /><br />
                    <input type="date" placeholder="Deadline" name="deadline" onChange={this.handleOnChange} /><br />
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