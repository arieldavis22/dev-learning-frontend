import React, { Component } from 'react';

class CLessonForm extends Component {
    state = {  
        code: "",
        return_value: this.props.return_value
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/check-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(data => {
            if(data.message === "Correct") {
                fetch("http://localhost:3000/correct", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        classroom_id: this.props.classroomID,
                        student_id: this.props.student_id,
                        points: this.props.points
                    })
                })
                .then(r => r.json())
                .then(console.log)
            } else {
                alert("Incorrect Answer")
            }
        })
    }

    render() { 
        console.log("CL FORM:", this.props)
        return (  
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <textarea name="code" onChange={this.handleOnChange} placeholder={this.props.boilerplate} />
                    <input type="Submit" />
                </form>
            </div>
        );
    }
}

export default CLessonForm;