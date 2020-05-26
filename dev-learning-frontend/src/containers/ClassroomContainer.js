import React, { Component } from 'react';
import ClassroomForm from '../components/ClassroomForm'
import {connect} from 'react-redux'
import Classroom from '../components/Classroom';
import { allClassooms, removeClassroom } from '../services/classrooms'
import { Container, Divider } from 'semantic-ui-react'
import { Virtuoso } from 'react-virtuoso'
import { toast } from 'react-toastify';


class ClassroomContainer extends Component {

    state = {
        students: []
    }

    borderStyle = {
        border: '5px dashed gray',
        borderRadius: '4px',
    }

    componentDidMount() {
        this.fetchAllClassrooms()
    }

    notifyClassroomRemove = () => {
        toast.success("Classroom Removed", {
        position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    fetchAllClassrooms = async () => {
        await allClassooms(this.props.currentUser.id)
        .then(classroomData => {
            console.log("CLASSROOM DATA", classroomData)
            this.props.setClassroom(classroomData)
        })
    }

    setNameAndID = (name, id) => {
        this.props.setName(name)
        this.props.setID(id)
    }

    handleRemoveClassroom = (id) => {
    removeClassroom(id)
    .then(() => {
        this.fetchAllClassrooms()
        this.notifyClassroomRemove()
    })
    }


    renderClassrooms = () => {
    
        if(this.props.classroom && Array.isArray(this.props.classroom)) {
            return <Virtuoso 
            style={{ width: '1050px', height: '500px'}} 
            totalCount={1} 
            item={() => <div>
                {this.props.classroom.map(classroom => {
                return <Classroom 
                key={classroom.id} 
                id={classroom.id}
                name={classroom.name}
                setInfo={this.setNameAndID}
                render={true}
                handleRemoveClassroom={this.handleRemoveClassroom}/>
                })}
            </div> } />
    }
}


    render() { 
        console.log("ALL STUDENTS FOR EACH CLASS:", this.props.classroom)
        return (  
            <div>
                {!this.props.currentUser ? this.props.history.push('/') : null}
                <Container textAlign='center'>
                    <ClassroomForm 
                    currentUser={this.props.currentUser}
                    addClassroom={this.props.addClassroom}
                    fetchAllClassrooms={this.fetchAllClassrooms}/>
                    <Divider />
                    {this.renderClassrooms()}
                    {this.state.students.map(student => <li>{student}</li>)}
                </Container>
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