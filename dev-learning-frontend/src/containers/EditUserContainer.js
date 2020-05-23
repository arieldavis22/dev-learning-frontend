import React, { Component } from 'react';
import { connect } from 'react-redux';
import FadeIn from 'react-fade-in';
import { editUser } from '../services/users'

class EditUserContainer extends Component {
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
        })
    }

    render() { 
        // console.log("EDIT USER STATE:", this.state)
        return (  
            <div>
                <FadeIn>
                <form onSubmit={this.handleOnSubmit}>
                    <input 
                    type="text" 
                    name="first_name" 
                    placeholder={this.props.currentUser.first_name} 
                    onChange={this.handleOnChange} />
                    <input 
                    type="text" 
                    name="last_name" 
                    placeholder={this.props.currentUser.last_name} 
                    onChange={this.handleOnChange} />
                    <input type="submit" />
                </form>
                </FadeIn>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch({type: "SET_USER", user})
})

export default connect(null, mapDispatchToProps)(EditUserContainer);