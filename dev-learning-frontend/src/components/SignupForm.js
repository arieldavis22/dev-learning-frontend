import React, { Component } from 'react';

class SignupForm extends Component {
    state = {  
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmitTeacher = event => {
        event.preventDefault()
        fetch("http://localhost:3000/tsignup", {
            method: "POST",
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
            console.log("New User Teacher is:")
            this.props.setUser(this.state)
            this.setState({
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            })
        })
        .catch(error => console.log(error))
    }

    handleOnSubmitStudent = event => {
        event.preventDefault()
        fetch("http://localhost:3000/ssignup", {
            method: "POST",
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
            console.log("New User Student is:")
            this.props.setUser(this.state)
            this.setState({
                first_name: '',
                last_name: '',
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
                Signup Teacher
                <form onSubmit={this.handleOnSubmitTeacher}>
                    <input type="text" name="first_name" placeholder="First Name" onChange={this.handleOnChange} /> <br/>
                    <input type="text" name="last_name" placeholder="Last Name" onChange={this.handleOnChange} /> <br/>
                    <input type="text" name="email" placeholder="Email" onChange={this.handleOnChange} /> <br/>
                    <input type="text" name="password" placeholder="Password" onChange={this.handleOnChange} /> <br/>
                    <input type="text" placeholder="Password Confirm" /> <br/>
                    <input type="submit" />
                </form>
                <br/>
                Signup Student
                <form onSubmit={this.handleOnSubmitStudent}>
                    <input type="text" name="first_name" placeholder="First Name" onChange={this.handleOnChange} /> <br/>
                    <input type="text" name="last_name" placeholder="Last Name" onChange={this.handleOnChange} /> <br/>
                    <input type="text" name="email" placeholder="Email" onChange={this.handleOnChange} /> <br/>
                    <input type="text" name="password" placeholder="Password" onChange={this.handleOnChange} /> <br/>
                    <input type="text" placeholder="Password Confirm" /> <br/>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default SignupForm;