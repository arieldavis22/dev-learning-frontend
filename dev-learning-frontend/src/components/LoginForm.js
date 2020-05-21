import React, { Component } from 'react';
import FadeIn from 'react-fade-in';

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
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(this.state)
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else {
                throw r
            }
        })
        .then(data => {
            console.log("logging in as:", data.data.attributes)
            this.props.setUser(data.data.attributes)
        })
    }
    render() { 
        console.log(this.state)
        return (  
            <div>
                <FadeIn>
                Login Teacher
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" name="email" onChange={this.handleOnChange} placeholder="Email"/><br/>
                    <input type="text" name="password" onChange={this.handleOnChange} placeholder="Password"/><br/>
                    <input type="submit"/>
                </form>
                </FadeIn>
            </div>
        );
    }
}

export default LoginForm;