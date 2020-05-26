import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import { Container } from 'semantic-ui-react'
import '../App.css'
import { connect } from 'react-redux';


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
                        src={require(`../images/logo/${this.props.logo}`)} 
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

const mapStateToProps = state => ({
    logo: state.app.logo
})

export default connect(mapStateToProps)(MainMenu);