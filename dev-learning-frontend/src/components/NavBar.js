import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { useSelector } from 'react-redux';

const NavBar = (props) => {
    const [activeItem, setActiveItem] = useState(null)
    const menu = useSelector(state => state.app.menu)
    const logo = useSelector(state => state.app.logo)

    const handleItemClick = (e, { name }) => setActiveItem(name)
    const imgStyle = {height: '60px', width: '180px'}
    return (  
            <Menu inverted={menu} style={{height: '70px'}}>
                <Menu.Item>
                <img 
                    src={require(`../images/logo/${logo}`)} 
                    alt="logo-light" 
                    style={imgStyle}/>
                </Menu.Item>

                <NavLink to="/" exact>
                    <Menu.Item
                    style={{height: '70px'}}
                        name='home'
                        active={activeItem === 'home'}
                        onClick={handleItemClick}>
                            Home
                    </Menu.Item>
                </NavLink>


                {!props.currentUser ? 
                    <>
                    <NavLink to="/signup" exact>
                    <Menu.Item
                    style={{height: '70px'}}
                        name='signup'
                        active={activeItem === 'signup'}
                        onClick={handleItemClick}>
                            Signup
                    </Menu.Item>
                    </NavLink>


                    <NavLink to="/login" exact>
                        <Menu.Item
                        style={{height: '70px'}}
                            name='login'
                            active={activeItem === 'login'}
                            onClick={handleItemClick}>
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
                            onClick={handleItemClick}>
                                Edit User
                        </Menu.Item>
                    </NavLink>

                    <NavLink to="/" >
                    <Menu.Item
                    style={{height: '70px'}}
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={props.logOut}>
                            Logout
                    </Menu.Item>
                    </NavLink>
                </>
                }
            </Menu>
    );
}

export default NavBar;