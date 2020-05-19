import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

class NavBar extends Component {

    render() { 
        // console.log("Navbar", this.props.currentUser)
        return (  
            <div>
                <NavLink to="/" exact>
                    <button>Home</button>
                </NavLink>
                {!this.props.currentUser ? 
                    <div>
                    <NavLink to="/signup" exact>
                        <button>Signup</button>
                    </NavLink>
                    <NavLink to="/login" exact>
                        <button>Login</button>
                    </NavLink>
                </div>
                :
                <div>
                    <NavLink to="/" >
                        <button onClick={this.props.logOut}>Logout</button>
                    </NavLink>

                    <NavLink to="/edit-user" exact>
                        <button>Edit User</button>
                    </NavLink>
                </div>
                }
            </div>
        );
    }
}

export default NavBar;