import React, { useEffect, useState } from 'react';
import ClassroomForm from '../components/ClassroomForm'
import Classroom from '../components/Classroom';
import { allClassooms, removeClassroom } from '../services/classrooms'
import { Container, Divider } from 'semantic-ui-react'
import { Virtuoso } from 'react-virtuoso'
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setClassroom, setClassroomName, setClassroomID } from '../store/classroomSlice';
import { useNavigate } from 'react-router-dom';

const ClassroomContainer: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const classroom = useAppSelector(state => state.classroom.classroom);
    const currentUser = useAppSelector(state => state.user.currentUser);

    const [students, setStudents] = useState<any[]>([]);

    const borderStyle = {
        border: '5px dashed gray',
        borderRadius: '4px',
    }

    useEffect(() => {
        fetchAllClassrooms()
    }, []);

    const notifyClassroomRemove = () => {
        toast.success("Classroom Removed", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const fetchAllClassrooms = async () => {
        if (!currentUser) return;
        
        try {
            const classroomData = await allClassooms((currentUser as any).id);
            console.log("CLASSROOM DATA", classroomData)
            dispatch(setClassroom(classroomData))
        } catch (error) {
            console.error(error);
        }
    }

    const setNameAndID = (name: string, id: string) => {
        dispatch(setClassroomName(name))
        dispatch(setClassroomID(id))
    }

    const handleRemoveClassroom = (id: string) => {
        removeClassroom(id)
            .then(() => {
                fetchAllClassrooms()
                notifyClassroomRemove()
            })
    }

    const renderClassrooms = () => {
        if (classroom && Array.isArray(classroom)) {
            return <Virtuoso 
                style={{ width: '1050px', height: '500px' }} 
                totalCount={1} 
                item={() => <div>
                    {classroom.map((cls: any) => {
                        return <Classroom 
                            key={cls.id} 
                            id={cls.id}
                            name={cls.name}
                            setInfo={setNameAndID}
                            render={true}
                            handleRemoveClassroom={handleRemoveClassroom}/>
                    })}
                </div>} />
        }
    }

    if (!currentUser) {
        navigate('/');
        return null;
    }

    return (
        <div>
            <Container textAlign='center'>
                <ClassroomForm 
                    currentUser={currentUser}
                    fetchAllClassrooms={fetchAllClassrooms}/>
                <Divider />
                {renderClassrooms()}
                {students.map((student: any) => <li key={student}>{student}</li>)}
            </Container>
        </div>
    );
}

export default ClassroomContainer;