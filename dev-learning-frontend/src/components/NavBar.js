import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class NavBar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() { 
        const { activeItem } = this.state
        return (  
            <Menu>

                <NavLink to="/" exact>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}>
                            Home
                    </Menu.Item>
                </NavLink>


                {!this.props.currentUser ? 
                    <>


                    <NavLink to="/signup" exact>
                    <Menu.Item
                        name='signup'
                        active={activeItem === 'signup'}>
                            Signup
                    </Menu.Item>
                    </NavLink>


                    <NavLink to="/login" exact>
                        <Menu.Item
                            name='login'
                            active={activeItem === 'login'}>
                                Login
                        </Menu.Item>
                    </NavLink>


                </>
                :
                <>


                    <NavLink to="/" >
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.props.logOut}>
                            Logout
                    </Menu.Item>
                    </NavLink>



                    <NavLink to="/edit-user" exact>
                    <Menu.Item
                            name='edit'
                            active={activeItem === 'edit'}
                            onClick={this.handleItemClick}>
                                Edit User
                        </Menu.Item>
                    </NavLink>


                </>
                }
            </Menu>
        );
    }
}


export default NavBar;