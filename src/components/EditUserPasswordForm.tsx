import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'

class EditUserPasswordForm extends Component {
    state = {  
        email: this.props.currentUser.email,
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        fetch("http://localhost:3000/change-password", {
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
                <Form>
                    <Form.Input icon='lock' iconPosition='left' type="text" name="currentPassword" placeholder="Current Password" onChange={this.handleChange}/>
                    <Form.Input icon='lock' iconPosition='left' type="text" name="newPassword" placeholder="New Password" onChange={this.handleChange}/>
                    <Form.Input icon='lock' iconPosition='left' type="text" name="newPasswordConfirm" placeholder="Confirm New Password" onChange={this.handleChange} />
                    <Button color={this.props.menu ? 'purple' : null} type="submit">Change Password</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    menu: state.app.menu
})

export default connect(mapStateToProps)(EditUserPasswordForm);