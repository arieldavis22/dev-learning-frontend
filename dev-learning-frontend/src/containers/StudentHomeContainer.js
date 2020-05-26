import React, { Component } from 'react';
import {connect} from 'react-redux'
import Classroom from '../components/Classroom'
import { Virtuoso } from 'react-virtuoso'
import { findAllStudentClassrooms } from '../services/users'
import FadeIn from 'react-fade-in';
import { Container } from 'semantic-ui-react'

class StudentHomeContainer extends Component {
    
    componentDidMount() {
        findAllStudentClassrooms(this.props.currentUser.id)
        .then(data => {
            this.props.setStudentClassrooms(data)
        })
    }

    setLessonState = (id) => {
        this.props.setID(id)
    }
    
    renderClassrooms = () => {
        if(this.props.studentClassrooms) {
            return <Virtuoso 
                style={{ width: '1050px', height: '300px' }} 
                totalCount={1} 
                item={() => <div>
                {this.props.studentClassrooms.map(classroom => {
                return <Classroom 
                    key={classroom.id} 
                    id={classroom.id}
                    name={classroom.name} 
                    student={true}
                    setLessonState={this.setLessonState}
                    student_id={this.props.currentUser.id}/>
            })} 
                </div>} />
        }
    }

    render() { 
        return (  
            <div>
                <FadeIn>
                    <Container textAlign='center'>
                        <h1>All Classrooms</h1>
                        {this.renderClassrooms()}
                    </Container>
                </FadeIn>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    studentClassrooms: state.student.studentClassrooms,
})

const mapDispatchToProps = dispatch => ({
    setStudentClassrooms: classrooms => dispatch({type: "SET_STUDENT_CLASSROOMS", classrooms}),
    setID: classID => dispatch({type: 'SET_CLASSROOM_ID', classID})
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentHomeContainer);