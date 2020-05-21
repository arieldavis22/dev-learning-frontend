import React, { Component } from 'react';
import { connect } from 'react-redux';
import Teacher from '../components/Teacher';

class TeacherFollowContainer extends Component {
    
    componentDidMount() {
        fetch("http://localhost:3000/all-teachers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                teacher_id: this.props.currentUser.id
            })
        })
        .then(r => r.json())
        .then(data => {
            this.props.setTeachers(data)
        })

        fetch("http://localhost:3000/following", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                teacher_id: this.props.currentUser.id
            })
        })
        .then(r => r.json())
        .then(data => {
            this.props.setFollowedTeachers(data)
        })
    }

    handleTeacherFollow = (id) => {
        fetch("http://localhost:3000/follow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                follower_id: this.props.currentUser.id,
                followee_id: id
            })
        })
        .then(r => r.json())
        .then(console.log)
    }

    renderFollowedTeachers = () => {
        if(this.props.followedTeachers.data) {
            return this.props.followedTeachers.data.map(teacher => 
                <Teacher 
                key={teacher.attributes.id} 
                id={teacher.attributes.id}
                first_name={teacher.attributes.first_name} 
                last_name={teacher.attributes.last_name}
                follow={true}/>
            )
        }
    }

    renderTeachers = () => {
        if(this.props.allTeachers.data && this.props.followedTeachers.data) {// eslint-disable-next-line
            return this.props.allTeachers.data.map(teacher => {
                if(teacher.attributes.id !== this.props.currentUser.id) {
                    return <Teacher 
                    key={teacher.attributes.id} 
                    id={teacher.attributes.id}
                    first_name={teacher.attributes.first_name} 
                    last_name={teacher.attributes.last_name}
                    notFollowed={true}
                    handleTeacherFollow={this.handleTeacherFollow}/>
                }
            })
        }
    }
    render() { 
        console.log("TEAHER FOLLOW:", this.props.followedTeachers)
        console.log("Teacher NOT FOLLOWED:", this.props.allTeachers)
        return (  
            <div>
                Teacher Follow
                <h1>Following</h1>
                {this.renderFollowedTeachers()}
                <h1>All Teachers</h1>
                {this.renderTeachers()}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    allTeachers: state.teacher.allTeachers,
    followedTeachers: state.teacher.followedTeachers
})

const mapDispatchToProps = dispatch => ({
    setTeachers: teachers => dispatch({type: "SET_ALL_TEACHERS", teachers}),
    setFollowedTeachers: teachers => dispatch({type: "SET_FOLLOWED_TEACHERS", teachers}),
    // addTeacher: teacher => dispatch({type: "ADD_FOLLOWED_TEACHER", teacher})
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherFollowContainer);