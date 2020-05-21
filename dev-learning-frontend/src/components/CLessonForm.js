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
                alert("Correct Answer")
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
                fetch("http://localhost:3000/wrong", {
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
            }
        })
    }


    render() { 
        return (  
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <textarea name="code" onChange={this.handleOnChange} placeholder={this.props.boilerplate} />
                    <button type="button" onClick={() => this.props.handleCodeTest(this.state.code)}>Run Code</button>
                    <input type="Submit" />
                </form>
            </div>
        );
    }
}

export default CLessonForm;