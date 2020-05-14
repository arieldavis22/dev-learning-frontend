import React, { Component } from 'react';

class LoginForm extends Component {
    state = {  
        email: '',
        password: ''
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault()
        fetch("http://localhost:3000/tlogin", {
            method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(this.state)
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else{
                throw r
            }
        })
        .then(data => {
            console.log("Logging in Teacher as:")
            this.props.setUser(data)
            this.setState({
                email: '',
                password: ''
            })
        })
        .catch(error => console.log(error))
    }

    handleOnSubmitStudent = event => {
        event.preventDefault()
        fetch("http://localhost:3000/slogin", {
            method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(this.state)
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else{
                throw r
            }
        })
        .then(data => {
            console.log("Logging in Student as:")
            this.props.setUser(data)
            this.setState({
                email: '',
                password: ''
            })
        })
        .catch(error => console.log(error))
    }
    render() { 
        console.log(this.state)
        return (  
            <div>
                Login Teacher
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" name="email" onChange={this.handleOnChange} placeholder="Email"/><br/>
                    <input type="text" name="password" onChange={this.handleOnChange} placeholder="Password"/><br/>
                    <input type="submit"/>
                </form>
                <br/>
                Login Student
                <form onSubmit={this.handleOnSubmitStudent}>
                    <input type="text" name="email" onChange={this.handleOnChange} placeholder="Email"/><br/>
                    <input type="text" name="password" onChange={this.handleOnChange} placeholder="Password"/><br/>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default LoginForm;