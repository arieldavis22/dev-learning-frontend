import React from 'react';
import { Divider, Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

const Report = ({ id, title, message, handleRemoveLesson, menu }) => {
    return (  
        <div>
            <Container textAlign='center'>
                <h1>{title}</h1>
                <p>{message}</p>
                <Button color={menu ? 'purple' : null} onClick={() => handleRemoveLesson(id)}>Remove Report</Button>
                <Divider/>
            </Container>
        </div>
    );
}

const mapStateToProps = state => ({
    menu: state.app.menu
})

export default connect(mapStateToProps)(Report);