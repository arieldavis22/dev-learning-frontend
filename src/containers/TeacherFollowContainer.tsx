import React, { useEffect } from 'react';
import Teacher from '../components/Teacher';
import { findAllTeachers, allTeacherFollowing, followTeacher } from '../services/users'
import { Container, Divider } from 'semantic-ui-react'
import { Virtuoso } from 'react-virtuoso'
import FadeIn from 'react-fade-in';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setAllTeachers, setFollowedTeachers } from '../store/teacherSlice';

const TeacherFollowContainer: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const allTeachers = useAppSelector(state => state.teacher.allTeachers);
    const followedTeachers = useAppSelector(state => state.teacher.followedTeachers);
    const currentUser = useAppSelector(state => state.user.currentUser);

    useEffect(() => {
        if (!currentUser) return;

        fetchAllTeachers()
        fetchFollowingTeachers()
    }, [currentUser])

    const fetchAllTeachers = () => {
        findAllTeachers((currentUser as any).id)
            .then(data => {
                dispatch(setAllTeachers(data))
            })
    }

    const fetchFollowingTeachers = () => {
        allTeacherFollowing((currentUser as any).id)
            .then(data => {
                dispatch(setFollowedTeachers(data))
            })
    }

    const notifyFollow = () => {
        toast.success("You now follow this teacher!", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const handleTeacherFollow = (id: string) => {
        followTeacher((currentUser as any).id, id).then(() => {
            fetchAllTeachers()
            notifyFollow()
            fetchFollowingTeachers()
        })
    }

    const renderFollowedTeachers = () => {
        if ((followedTeachers as any).data) {
            return <Virtuoso 
                style={{ width: '1050px', height: '200px' }} 
                totalCount={1} 
                item={() => <div>
                    {(followedTeachers as any).data.map((teacher: any) => {
                        return <Teacher 
                            key={teacher.attributes.id} 
                            id={teacher.attributes.id}
                            first_name={teacher.attributes.first_name} 
                            last_name={teacher.attributes.last_name}
                            follow={true}/>
                    })}
                </div>}/>
        }
    }

    const renderTeachers = () => {
        if ((allTeachers as any).data && (followedTeachers as any).data) {
            return <Virtuoso 
                style={{ width: '1050px', height: '200px' }} 
                totalCount={1} 
                item={() => <div>
                    {(allTeachers as any).data.map((teacher: any) => {
                        if (teacher.attributes.id !== (currentUser as any).id) {
                            return <Teacher 
                                key={teacher.attributes.id} 
                                id={teacher.attributes.id}
                                first_name={teacher.attributes.first_name} 
                                last_name={teacher.attributes.last_name}
                                notFollowed={true}
                                handleTeacherFollow={handleTeacherFollow}/>
                        }
                    })}
                </div>}/>
        }
    }

    if (!currentUser) {
        navigate('/');
        return null;
    }

    return (
        <div>
            <FadeIn>
                <Container textAlign='center'>
                    <h1>Following</h1>
                    {renderFollowedTeachers()}
                    <Divider />
                    <h1>All Teachers</h1>
                    {renderTeachers()}
                </Container>
            </FadeIn>
            </div>
    );
}

export default TeacherFollowContainer;