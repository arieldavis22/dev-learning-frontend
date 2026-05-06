import React, { useState } from 'react';
import { newClassroom } from '../services/classrooms'
import { Button, Form } from 'semantic-ui-react'
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addClassroom } from '../store/classroomSlice';

interface ClassroomFormProps {
    currentUser: any;
    fetchAllClassrooms: () => Promise<void>;
}

const ClassroomForm: React.FC<ClassroomFormProps> = ({ currentUser, fetchAllClassrooms }) => {
    const dispatch = useAppDispatch();
    const menu = useAppSelector(state => state.app.menu);

    const [formData, setFormData] = useState({
        teacher_id: currentUser?.id || '',
        name: ''
    });

    const notifyClassroom = () => {
        toast.success("Classroom Created", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            teacher_id: currentUser?.id || '',
            [event.target.name]: event.target.value
        })
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        newClassroom(formData)
            .then(classroomData => {
                fetchAllClassrooms()
                dispatch(addClassroom(classroomData))
                notifyClassroom()
                setFormData({
                    teacher_id: currentUser?.id || '',
                    name: ''
                })
            })
    }

    return (
        <div>
            <Form onSubmit={handleOnSubmit}>
                <Form.Input 
                    icon='book' 
                    iconPosition='left' 
                    type="text" 
                    name="name" 
                    onChange={handleOnChange} 
                    placeholder="Classroom Name" 
                    value={formData.name} />
                <Button color={menu ? 'purple' : undefined} type='submit'>Create New Classroom</Button>
            </Form>
        </div>
    );
}

export default ClassroomForm;