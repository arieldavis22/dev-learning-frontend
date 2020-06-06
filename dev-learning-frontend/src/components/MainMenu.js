import React from 'react';
import FadeIn from 'react-fade-in';
import { Container } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import '../App.css'

const MainMenu = () => {
    const imgStyle = {height: '100px'}
    const logo = useSelector(state => state.app.logo)
    return (  
        <div>
            <FadeIn>
                <Container textAlign='center'>
                    <img 
                    src={require(`../images/logo/${logo}`)} 
                    alt="logo-light" 
                    style={imgStyle}
                    />
                </Container>
                <Container textAlign='center'>
                    Online Education System
                </Container>
            </FadeIn>
        </div>
    );
}

export default MainMenu;