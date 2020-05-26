import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

class ToggleDarkMode extends Component {
    state = {}
    handleClick = () =>{
        //rgb(20, 20, 20)
        this.setState((prevState) => ({ active: !prevState.active }))

        if(!this.state.active) {
            this.props.toggleDark('rgb(92, 92, 92)')
            this.props.toggleDarkLogo('logo-dark.png')
            this.props.toggleDarkMenu()
        } else {
            this.props.toggleLight('rgb(212, 212, 212)')
            this.props.toggleLightLogo('logo-light.png')
            this.props.toggleLightMenu()
        }
    }
    
    render() { 
        console.log(this.state)
        const { active } = this.state
        return (  
            <div>
                <Button toggle active={active} onClick={this.handleClick}>
                    Dark Mode
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    toggleDark: dark => dispatch({type: 'SET_BACK_DARK', dark}),
    toggleLight: light => dispatch({type: 'SET_BACK_LIGHT', light}),
    toggleDarkLogo: dark => dispatch({type: 'SET_LOGO_DARK', dark}),
    toggleLightLogo: light => dispatch({type: 'SET_LOGO_LIGHT', light}),
    toggleDarkMenu: () => dispatch({type: 'SET_MENU_DARK'}),
    toggleLightMenu: () => dispatch({type: 'SET_MENU_LIGHT'})
})
export default connect(null, mapDispatchToProps)(ToggleDarkMode);