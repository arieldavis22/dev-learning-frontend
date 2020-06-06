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

// class NavBar extends Component {
//     state = {}

//     handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//     imgStyle = {
//         height: '60px',
//         width: '180px'
//     }
//     render() { 
//         const { activeItem } = this.state
//         return (  
//             <Menu inverted={this.props.menu} style={{height: '70px'}}>
//                 <Menu.Item>
//                 <img 
//                     src={require(`../images/logo/${this.props.logo}`)} 
//                     alt="logo-light" 
//                     style={this.imgStyle}
//                     />
//                 </Menu.Item>

//                 <NavLink to="/" exact>
//                     <Menu.Item
//                     style={{height: '70px'}}
//                         name='home'
//                         active={activeItem === 'home'}
//                         onClick={this.handleItemClick}>
//                             Home
//                     </Menu.Item>
//                 </NavLink>


//                 {!this.props.currentUser ? 
//                     <>


//                     <NavLink to="/signup" exact>
//                     <Menu.Item
//                     style={{height: '70px'}}
//                         name='signup'
//                         active={activeItem === 'signup'}
//                         onClick={this.handleItemClick}>
//                             Signup
//                     </Menu.Item>
//                     </NavLink>


//                     <NavLink to="/login" exact>
//                         <Menu.Item
//                         style={{height: '70px'}}
//                             name='login'
//                             active={activeItem === 'login'}
//                             onClick={this.handleItemClick}>
//                                 Login
//                         </Menu.Item>
//                     </NavLink>


//                 </>
//                 :
//                 <>


//                     <NavLink to="/edit-user" exact>
//                     <Menu.Item
//                     style={{height: '70px'}}
//                             name='edit'
//                             active={activeItem === 'edit'}
//                             onClick={this.handleItemClick}>
//                                 Edit User
//                         </Menu.Item>
//                     </NavLink>

//                     <NavLink to="/" >
//                     <Menu.Item
//                     style={{height: '70px'}}
//                         name='logout'
//                         active={activeItem === 'logout'}
//                         onClick={this.props.logOut}>
//                             Logout
//                     </Menu.Item>
//                     </NavLink>


//                 </>
//                 }
//             </Menu>
//         );
//     }
// }

// const mapStateToProps = state => ({
//     logo: state.app.logo,
//     menu: state.app.menu
// })


// export default connect(mapStateToProps)(NavBar);