import React, { Component } from 'react';
import { editUser } from '../services/users'
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'
import { toast } from 'react-toastify';

class EditUserForm extends Component {
    state = {  
        first_name: '',
        last_name: '',
        id: this.props.currentUser.id
    }

    componentDidMount() {
        this.setState({
            first_name: this.props.currentUser.first_name,
            last_name: this.props.currentUser.last_name
        })
    }

    notifyUserNameChange = () => {
        toast.success("Name Changed", {
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
        editUser(this.state)
        .then(data => {
            this.props.setUser(data)
            this.notifyUserNameChange()
            this.props.history.push('/')
        })
    }

    render() { 
        console.log("EDIT USER STATE:", this.props)
        return (  
            <div>
                <Form onSubmit={this.handleOnSubmit}>
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        type="text" 
                        name="first_name" 
                        placeholder={this.props.currentUser.first_name} 
                        onChange={this.handleOnChange} />
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        type="text" 
                        name="last_name" 
                        placeholder={this.props.currentUser.last_name} 
                        onChange={this.handleOnChange} />
                    <Button color={this.props.menu ? 'purple' : null} type='submit'>Change Name</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    menu: state.app.menu
})

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch({type: "SET_USER", user})
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);