import React, { Component } from 'react';
import {connect} from 'react-redux'
import Classroom from '../components/Classroom'

class StudentHomeContainer extends Component {
    
    componentDidMount() {
        fetch("http://localhost:3000/find-classrooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                student_id: this.props.currentUser.id
            })
        })
        .then(r => r.json())
        .then(data => {
            this.props.setStudentClassrooms(data)
        })
    }
    
    renderClassrooms = () => {
        if(this.props.studentClassrooms) {
            return this.props.studentClassrooms.map(classroom => {
                return <Classroom key={classroom.id} name={classroom.name} student={true}/>
            })
        }
    }

    render() { 
        return (  
            <div>
                <h1>All Classrooms</h1>
                {this.renderClassrooms()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studentClassrooms: state.studentClassrooms,
})

const mapDispatchToProps = dispatch => ({
    setStudentClassrooms: classrooms => dispatch({type: "SET_STUDENT_CLASSROOMS", classrooms}),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentHomeContainer);