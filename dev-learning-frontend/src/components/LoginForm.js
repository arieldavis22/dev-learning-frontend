import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import { login } from '../services/users'
import { Button, Container, Form } from 'semantic-ui-react'
import '../App.css'

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
            // console.log("logging in as:", data.data.attributes)
            this.props.setUser(data.data.attributes)
            this.props.history.push('/')
        })
    }
    render() { 
        console.log(this.props)
        return (  
            <div>
                <FadeIn>
                <Container textAlign='center'>
                    <Form onSubmit={this.handleOnSubmit}>
                        <Form.Input 
                        icon='user'
                        iconPosition='left'
                        type="text" 
                        name="email" 
                        onChange={this.handleOnChange} 
                        placeholder="Email" />
                        <Form.Input 
                        icon='lock'
                        iconPosition='left'
                        type="text" 
                        name="password" 
                        onChange={this.handleOnChange} 
                        placeholder="Password" />
                        <Button type="submit">Log In</Button>
                    </Form>
                </Container>
                </FadeIn>
            </div>
        );
    }
}

export default LoginForm;