import React, { Component } from 'react';
import ClassroomForm from '../components/ClassroomForm'
import {connect} from 'react-redux'
import Classroom from '../components/Classroom';
class ClassroomContainer extends Component {

    state = {
        students: []
    }

    fetchAllClassrooms = () => {
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

    componentDidMount() {
        this.fetchAllClassrooms()
    }

    setNameAndID = (name, id) => {
        this.props.setName(name)
        this.props.setID(id)
    }


    renderClassrooms = () => {
        if(this.props.classroom) {
            return this.props.classroom.map(classroom => <Classroom 
                key={classroom.id} 
                id={classroom.id}
                name={classroom.name}
                setInfo={this.setNameAndID}
                render={true}/>)
        }
    }


    render() { 
        console.log("ALL STUDENTS FOR EACH CLASS:", this.props.studentsInClass)
        return (  
            <div>
                <ClassroomForm 
                currentUser={this.props.currentUser}
                addClassroom={this.props.addClassroom}
                fetchAllClassrooms={this.fetchAllClassrooms}/>
                {this.renderClassrooms()}
                {this.state.students.map(student => <li>{student}</li>)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classroom: state.classroom.classroom,
})

const mapDispatchToProps = dispatch => ({
    setClassroom: classroom => dispatch({type: "SET_CLASSROOM", classroom}),
    addClassroom: classroom => dispatch({type: "ADD_CLASSROOM", classroom}),
    setName: name => dispatch({type: "SET_CLASSROOM_NAME", name}),
    setID: classID => dispatch({type: 'SET_CLASSROOM_ID', classID}),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomContainer);