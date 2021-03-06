import React, { Component } from 'react';
import { connect } from 'react-redux';
import Teacher from '../components/Teacher';
import { findAllTeachers, allTeacherFollowing, followTeacher } from '../services/users'
import { Container, Divider } from 'semantic-ui-react'
import { Virtuoso } from 'react-virtuoso'
import FadeIn from 'react-fade-in';
import { toast } from 'react-toastify';

class TeacherFollowContainer extends Component {
    
    componentDidMount() {
        this.fetchAllTeachers()
        this.fetchFollowingTeachers()

    }

    fetchAllTeachers = () => {
        findAllTeachers(this.props.currentUser.id)
        .then(data => {
            this.props.setTeachers(data)
        })
    }

    fetchFollowingTeachers = () => {
        allTeacherFollowing(this.props.currentUser.id)
        .then(data => {
            this.props.setFollowedTeachers(data)
        })
    }
    notifyFollow = () => {
        toast.success("You now follow this teacher!", {
        position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    handleTeacherFollow = (id) => {
        followTeacher(this.props.currentUser.id, id).then(() => {
            this.fetchAllTeachers()
            this.notifyFollow()
            this.fetchFollowingTeachers()
        })
    }

    renderFollowedTeachers = () => {
        if(this.props.followedTeachers.data) {
            return <Virtuoso 
            style={{ width: '1050px', height: '200px'}} 
            totalCount={1} 
            item={() => <div>
                {this.props.followedTeachers.data.map(teacher =>{
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

    renderTeachers = () => {
        if(this.props.allTeachers.data && this.props.followedTeachers.data) {
            return <Virtuoso 
            style={{ width: '1050px', height: '200px'}} 
            totalCount={1} 
            item={() => <div> {/* eslint-disable-next-line */}
                {this.props.allTeachers.data.map(teacher => {
                    if(teacher.attributes.id !== this.props.currentUser.id) {
                        return <Teacher 
                        key={teacher.attributes.id} 
                        id={teacher.attributes.id}
                        first_name={teacher.attributes.first_name} 
                        last_name={teacher.attributes.last_name}
                        notFollowed={true}
                        handleTeacherFollow={this.handleTeacherFollow}/>
                    }
                })}
            </div>}/>
        }
    }
    render() { 
        return (  
            <div>
                {!this.props.currentUser ? this.props.history.push('/') : null}
                <FadeIn>
                    <Container textAlign='center'>
                        <h1>Following</h1>
                        {this.renderFollowedTeachers()}
                        <Divider />
                        <h1>All Teachers</h1>
                        {this.renderTeachers()}
                    </Container>
                </FadeIn>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    allTeachers: state.teacher.allTeachers,
    followedTeachers: state.teacher.followedTeachers,
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setTeachers: teachers => dispatch({type: "SET_ALL_TEACHERS", teachers}),
    setFollowedTeachers: teachers => dispatch({type: "SET_FOLLOWED_TEACHERS", teachers}),
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherFollowContainer);