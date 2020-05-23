import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import { login } from '../services/users'

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

        login(this.state)
        .then(data => {
            console.log("logging in as:", data.data.attributes)
            this.props.setUser(data.data.attributes)
        })
    }
    render() { 
        // console.log(this.state)
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