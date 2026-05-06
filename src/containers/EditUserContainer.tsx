import React from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm'
import EditUserPasswordForm from '../components/EditUserPasswordForm';
import FadeIn from 'react-fade-in';
import { Container, Divider } from 'semantic-ui-react'
import { useAppSelector } from '../store/hooks';

const EditUserContainer: React.FC = () => {
    const navigate = useNavigate();
    const currentUser = useAppSelector(state => state.user.currentUser);

    if (!currentUser) {
        navigate('/');
        return null;
    }

    return (
        <div>
            <FadeIn>
                <Container textAlign='center'>
                    <h1>Change First/Last Name</h1>
                    <EditUserForm />
                    <Divider />
                    <h1>Change Password</h1>
                    <EditUserPasswordForm />
                </Container>
            </FadeIn>
        </div>
    );
}

export default EditUserContainer;