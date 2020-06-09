import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditUserForm from '../components/EditUserForm'
import EditUserPasswordForm from '../components/EditUserPasswordForm';
import FadeIn from 'react-fade-in';
import { Container, Divider } from 'semantic-ui-react'



class EditUserContainer extends Component {

    render() { 
        // console.log("EDIT USER STATE:", this.state)
        return (  
            <div>
                {!this.props.currentUser ? this.props.history.push('/') : null}
                <FadeIn>
                    <Container textAlign='center'>
                        <h1>Change First/Last Name</h1>
                        <EditUserForm 
                        history={this.props.history}/>
                        <Divider />
                        <h1>Change Password</h1>
                        <EditUserPasswordForm />
                    </Container>
                </FadeIn>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(null, mapDispatchToProps)(EditUserContainer);