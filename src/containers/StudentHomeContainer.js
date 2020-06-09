// import React, { Component } from 'react';
import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
// import {connect} from 'react-redux'
import Classroom from '../components/Classroom'
import { Virtuoso } from 'react-virtuoso'
import { findAllStudentClassrooms } from '../services/users'
import FadeIn from 'react-fade-in';
import { Container } from 'semantic-ui-react'

const StudentHomeContainer = (props) => {
    const studentClassrooms = useSelector(state => state.student.studentClassrooms)
    const dispatch = useDispatch()
    const setStudentClassrooms = classrooms => dispatch({type: "SET_STUDENT_CLASSROOMS", classrooms})
    const setID = classID => dispatch({type: 'SET_CLASSROOM_ID', classID})

    useEffect(() => {
        findAllStudentClassrooms(props.currentUser.id)
        .then(data => setStudentClassrooms(data))// eslint-disable-next-line
    }, [props.currentUser.id])

    const setLessonState = (id) => {
        setID(id)
    }
    //Line 14:11:  The 'setStudentClassrooms' function makes the dependencies of useEffect Hook 
    //(at line 20) change on every render. Move it inside the useEffect callback. 
    //Alternatively, wrap the 'setStudentClassrooms' definition into its own useCallback() 
    //Hook  react-hooks/exhaustive-deps

    const renderClassrooms = () => {
        if(studentClassrooms) {
            return <Virtuoso 
                style={{ width: '1050px', height: '300px' }} 
                totalCount={1} 
                item={() => <div>
                {studentClassrooms.map(classroom => {
                return <Classroom 
                    key={classroom.id} 
                    id={classroom.id}
                    name={classroom.name} 
                    student={true}
                    setLessonState={setLessonState}
                    student_id={props.currentUser.id}/>
            })} 
                </div>} />
        }
    }

    return (  
        <div>
        <FadeIn>
            <Container textAlign='center'>
                <h1>All Classrooms</h1>
                {renderClassrooms()}
            </Container>
        </FadeIn>
    </div>
    );
}

export default StudentHomeContainer;

// class StudentHomeContainer extends Component {
    
//     componentDidMount() {
//         findAllStudentClassrooms(this.props.currentUser.id)
//         .then(data => {
//             this.props.setStudentClassrooms(data)
//         })
//     }

//     setLessonState = (id) => {
//         this.props.setID(id)
//     }
    
//     renderClassrooms = () => {
//         if(this.props.studentClassrooms) {
//             return <Virtuoso 
//                 style={{ width: '1050px', height: '300px' }} 
//                 totalCount={1} 
//                 item={() => <div>
//                 {this.props.studentClassrooms.map(classroom => {
//                 return <Classroom 
//                     key={classroom.id} 
//                     id={classroom.id}
//                     name={classroom.name} 
//                     student={true}
//                     setLessonState={this.setLessonState}
//                     student_id={this.props.currentUser.id}/>
//             })} 
//                 </div>} />
//         }
//     }

//     render() { 
//         return (  
//             <div>
//                 <FadeIn>
//                     <Container textAlign='center'>
//                         <h1>All Classrooms</h1>
//                         {this.renderClassrooms()}
//                     </Container>
//                 </FadeIn>
//             </div>
//         );
//     }
// }

// const mapStateToProps = state => ({
//     studentClassrooms: state.student.studentClassrooms,
// })

// const mapDispatchToProps = dispatch => ({
//     setStudentClassrooms: classrooms => dispatch({type: "SET_STUDENT_CLASSROOMS", classrooms}),
//     setID: classID => dispatch({type: 'SET_CLASSROOM_ID', classID})
// })

// export default connect(mapStateToProps, mapDispatchToProps)(StudentHomeContainer);