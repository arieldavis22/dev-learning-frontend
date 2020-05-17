import React, { Component } from 'react';
import ClassroomForm from '../components/ClassroomForm'
import {connect} from 'react-redux'
import Classroom from '../components/Classroom';
class ClassroomContainer extends Component {

    state = {
        students: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/all-classrooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                id: this.props.currentUser.id
            })
        })
        .then(r => r.json())
        .then(classroomData => {
            console.log("CLASSROOM DATA", classroomData)
            this.props.setClassroom(classroomData)
        })
    }

    setNameAndID = (name, id) => {
        this.props.setName(name)
        this.props.setID(id)
    }

    renderClassroomStudents = (id) => {
        fetch("http://localhost:3000/find-students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classroom_id: id
            })
        })
        .then(r => r.json())
        .then(studentData => {
            return studentData.data.map(student =>{
                return console.log(student)
            })
        })
    }


    renderClassrooms = () => {
        if(this.props.classroom) {
            return this.props.classroom.map(classroom => <Classroom 
                key={classroom.id} 
                id={classroom.id}
                name={classroom.name}
                renderClassroomStudents={this.renderClassroomStudents}
                setInfo={this.setNameAndID}/>)
        }
    }


    render() { 
        console.log("ALL STUDENTS FOR EACH CLASS:", this.props.studentsInClass)
        return (  
            <div>
                <ClassroomForm 
                currentUser={this.props.currentUser}
                addClassroom={this.props.addClassroom}/>
                {this.renderClassrooms()}
                {this.state.students.map(student => <li>{student}</li>)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classroom: state.classroom,
})

const mapDispatchToProps = dispatch => ({
    setClassroom: classroom => dispatch({type: "SET_CLASSROOM", classroom}),
    addClassroom: classroom => dispatch({type: "ADD_CLASSROOM", classroom}),
    setName: name => dispatch({type: "SET_CLASSROOM_NAME", name}),
    setID: classID => dispatch({type: 'SET_CLASSROOM_ID', classID}),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomContainer);