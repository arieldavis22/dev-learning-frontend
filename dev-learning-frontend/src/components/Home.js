import React, { Component } from 'react';

class Home extends Component {
    render() { 
        return (  
            <div>
                Home
                {this.props.currentUser ? <h1>Welcome back, {this.props.currentUser.first_name}</h1> : null}
            </div>
        );
    }
}

export default Home;