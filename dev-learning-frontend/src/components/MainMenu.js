import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import { Container } from 'semantic-ui-react'
import '../App.css'


class MainMenu extends Component {
    state = {  }

    imgStyle = {
        height: '100px',
    }
    render() { 
        return (  
            <div>
                <FadeIn>
                    <Container textAlign='center'>
                        <img 
                        src={require('../images/logo/logo-light.png')} 
                        alt="logo-light" 
                        style={this.imgStyle}
                        />
                    </Container>
                    <Container textAlign='center'>
                        Online Education System
                    </Container>
                </FadeIn>
            </div>
        );
    }
}

export default MainMenu;