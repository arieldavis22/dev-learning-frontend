import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class NavBar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    imgStyle = {
        height: '60px',
        width: '180px'
    }
    render() { 
        const { activeItem } = this.state
        return (  
            <Menu style={{height: '70px'}}>
                <Menu.Item>
                <img 
                    src={require('../images/logo/logo-light.png')} 
                    alt="logo-light" 
                    style={this.imgStyle}
                    />
                </Menu.Item>

                <NavLink to="/" exact>
                    <Menu.Item
                    style={{height: '70px'}}
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
                    style={{height: '70px'}}
                        name='signup'
                        active={activeItem === 'signup'}
                        onClick={this.handleItemClick}>
                            Signup
                    </Menu.Item>
                    </NavLink>


                    <NavLink to="/login" exact>
                        <Menu.Item
                        style={{height: '70px'}}
                            name='login'
                            active={activeItem === 'login'}
                            onClick={this.handleItemClick}>
                                Login
                        </Menu.Item>
                    </NavLink>


                </>
                :
                <>


                    <NavLink to="/edit-user" exact>
                    <Menu.Item
                    style={{height: '70px'}}
                            name='edit'
                            active={activeItem === 'edit'}
                            onClick={this.handleItemClick}>
                                Edit User
                        </Menu.Item>
                    </NavLink>

                    <NavLink to="/" >
                    <Menu.Item
                    style={{height: '70px'}}
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.props.logOut}>
                            Logout
                    </Menu.Item>
                    </NavLink>


                </>
                }
            </Menu>
        );
    }
}


export default NavBar;