import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import { login } from '../services/users'
import { Button, Container, Form } from 'semantic-ui-react'
import '../App.css'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

class LoginForm extends Component {
    state = {  
        email: '',
        password: ''
    }
    
    notifyLogIn = () => {
        toast.success("Login Successful", {
        position: toast.POSITION.BOTTOM_RIGHT
        })
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
            this.notifyLogIn()
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
                        <Button color={this.props.menu ? 'purple' : null} type="submit">Log In</Button>
                    </Form>
                </Container>
                </FadeIn>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    menu: state.app.menu
})

export default connect(mapStateToProps)(LoginForm);