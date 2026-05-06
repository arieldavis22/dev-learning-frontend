import React, { useState } from 'react';
import FadeIn from 'react-fade-in';
import { login } from '../services/users'
import { Button, Container, Form } from 'semantic-ui-react'
import '../App.css'
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const menu = useAppSelector(state => state.app.menu);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const notifyLogIn = () => {
        toast.success("Login Successful", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const notifyLogInFail = () => {
        toast.error("Incorrect Information Provided", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        login(formData)
            .then(data => {
                dispatch(setUser(data.data.attributes))
                notifyLogIn()
                navigate('/')
            })
            .catch(() => notifyLogInFail())
    }

    return (
        <div>
            <FadeIn>
                <Container textAlign='center'>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Input 
                            icon='user'
                            iconPosition='left'
                            type="text" 
                            name="email" 
                            onChange={handleOnChange} 
                            placeholder="Email" />
                        <Form.Input 
                            icon='lock'
                            iconPosition='left'
                            type="password" 
                            name="password" 
                            onChange={handleOnChange} 
                            placeholder="Password" />
                        <Button color={menu ? 'purple' : undefined} type="submit">Log In</Button>
                    </Form>
                </Container>
            </FadeIn>
        </div>
    );
}

export default LoginForm;