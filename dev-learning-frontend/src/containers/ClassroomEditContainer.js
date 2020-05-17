import React, { Component } from 'react';
import {connect} from 'react-redux'
import Student from '../components/Student'

class ClassroomEditContainer extends Component {
    componentDidMount() {
        fetch("http://localhost:3000/all-students", {
            credentials: "include"
        })
        .then(r => r.json())
        .then(studentData => {
            this.props.setStudents(studentData)
        })
    }

    handleClick = (id) => {
        fetch("http://localhost:3000/add-student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classroom_id: this.props.classroomID,
                student_id: id
            })
        })
        .then(r => r.json())
        .then(console.log)
    }

    renderAllStudents = () => {
        if(this.props.allStudents.data) {
            return this.props.allStudents.data.map(student => <Student 
                key={student.attributes.id}
                id={student.attributes.id}
                first_name={student.attributes.first_name}
                last_name={student.attributes.last_name}
                handleClick={this.handleClick}/>)
        }
    }

    render() { 
        console.log('CLASSROOM EDIT CONTAINER:', this.props.classroomName, this.props.classroomID)
        return (  
            <div>
                Edit Classroom
                {this.renderAllStudents()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classroomName: state.classroomName,
    allStudents: state.allStudents,
    classroomID: state.classroomID
})

const mapDispatchToProps = dispatch => ({
    setStudents: students => dispatch({type: "SET_STUDENTS", students})
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomEditContainer);