import React, { Component } from 'react';
import { connect } from 'react-redux';
import Teacher from '../components/Teacher';

class TeacherFollowContainer extends Component {
    
    componentDidMount() {
        fetch("http://localhost:3000/all-teachers", {
        credentials: 'include'
        })
        .then(r => r.json())
        .then(data => {
            this.props.setTeachers(data)
        })
    }

    renderTeachers = () => {
        if(this.props.allTeachers.data) {// eslint-disable-next-line
            return this.props.allTeachers.data.map(teacher => {
                if(teacher.attributes.id !== this.props.currentUser.id) {
                    return <Teacher 
                    key={teacher.attributes.id} 
                    first_name={teacher.attributes.first_name} 
                    last_name={teacher.attributes.last_name}/>
                }
            })
        }
    }
    render() { 
        console.log("TEAHER FOLLOW:", this.props.allTeachers)
        return (  
            <div>
                Teacher Follow
                <h1>Following</h1>
                <h1>All Teachers</h1>
                {this.renderTeachers()}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    allTeachers: state.allTeachers
})

const mapDispatchToProps = dispatch => ({
    setTeachers: teachers => dispatch({type: "SET_ALL_TEACHERS", teachers})
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherFollowContainer);