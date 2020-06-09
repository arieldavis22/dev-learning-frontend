import React, { useState } from 'react';
import { Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';

const ToggleDarkMode = () => {
    const [active, setActive] = useState(false)
    const dispatch = useDispatch()
    const toggleDark = dark => dispatch({type: 'SET_BACK_DARK', dark})
    const toggleDarkLogo = dark => dispatch({type: 'SET_LOGO_DARK', dark})
    const toggleDarkMenu = () => dispatch({type: 'SET_MENU_DARK'})

    const toggleLight = light => dispatch({type: 'SET_BACK_LIGHT', light})
    const toggleLightLogo = light => dispatch({type: 'SET_LOGO_LIGHT', light})
    const toggleLightMenu = () => dispatch({type: 'SET_MENU_LIGHT'})

    const handleClick = () => {
        setActive(!active)

        if(!active) {
            toggleDark('rgb(92, 92, 92)')
            toggleDarkLogo('logo-dark.png')
            toggleDarkMenu()
        } else {
            toggleLight('rgb(212, 212, 212)')
            toggleLightLogo('logo-light.png')
            toggleLightMenu()
        }
    }
    return (  
        <div>
            <Button toggle active={active} onClick={handleClick}>
                Dark Mode
            </Button>
        </div>
    );
}

export default ToggleDarkMode;