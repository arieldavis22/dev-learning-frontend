import React, { Component } from 'react';

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
        fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(data => {
            console.log("SIGN UP:",data.data.attributes)
            this.props.setUser(data.data.attributes)
        })
    }
    
    render() { 
        return (  
            <div>
                Signup
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" name="first_name" placeholder="First Name" onChange={this.handleOnChange} /> <br/>
                    <input type="text" name="last_name" placeholder="Last Name" onChange={this.handleOnChange} /> <br/>
                    <input type="text" name="email" placeholder="Email" onChange={this.handleOnChange} /> <br/>
                    <input type="text" name="password" placeholder="Password" onChange={this.handleOnChange} /> <br/>
                    <input type="text" placeholder="Password Confirm" /> <br/>
                    <input type="radio" id="teachChoice" name="role" value="Teacher" onChange={this.handleOnChange} />
                    <label htmlFor="teachChoice">Teacher</label>
                    <input type="radio" id="studChoice"name="role" value="Student" onChange={this.handleOnChange} />
                    <label htmlFor="studChoice">Student</label>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default SignupForm;