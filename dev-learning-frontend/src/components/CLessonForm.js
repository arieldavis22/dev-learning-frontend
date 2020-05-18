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
            } else {
                alert("Incorrect Answer")
            }
        })
    }

    render() { 
        console.log("CL FORM:", this.state)
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