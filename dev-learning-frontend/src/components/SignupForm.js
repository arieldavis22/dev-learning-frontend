import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import { signup } from '../services/users'
import { Button, Container, Form, } from 'semantic-ui-react'
import { connect } from 'react-redux';

class SignupForm extends Component {
    state = {  
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: null,
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault()

        signup(this.state)
        .then(data => {
            console.log("SIGN UP:",data.data.attributes)
            this.props.setUser(data.data.attributes)
        })
    }
    
    render() { 
        return (  
            <div>
                <FadeIn>
                <Container textAlign='center'>
                    <Form onSubmit={this.handleOnSubmit}>
                        <Form.Input icon="user outline" iconPosition='left' type="text" name="first_name" placeholder="First Name" onChange={this.handleOnChange}/>
                        <Form.Input icon="user outline" iconPosition='left' type="text" name="last_name" placeholder="Last Name" onChange={this.handleOnChange}/>
                        <Form.Input icon="envelope outline" iconPosition='left' type="text" name="email" placeholder="Email" onChange={this.handleOnChange}/>
                        <Form.Input icon='lock' iconPosition='left' type="text" name="password" placeholder="Password" onChange={this.handleOnChange}/>
                        <Form.Input icon='lock' iconPosition='left'type="text" placeholder="Password Confirm"/>
                        <label>Teacher Or Student</label>
                        <Form.Radio type="radio" label="Teacher" id="teachChoice" name="role" value="Teacher" onChange={this.handleOnChange}/>
                        <Form.Radio type="radio" label="Student" id="studChoice"name="role" value="Student" onChange={this.handleOnChange}/>
                        <Button color={this.props.menu ? 'purple' : null} type="submit">Signup</Button>
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
export default connect(mapStateToProps)(SignupForm);