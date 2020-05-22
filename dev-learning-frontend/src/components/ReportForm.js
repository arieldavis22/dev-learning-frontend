import React, { Component } from 'react';

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
        console.log("working")
        fetch("http://localhost:3000/new-report", {
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