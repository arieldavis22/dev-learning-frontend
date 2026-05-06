import React, { useEffect } from 'react';
import Classroom from '../components/Classroom'
import { Virtuoso } from 'react-virtuoso'
import { findAllStudentClassrooms } from '../services/users'
import FadeIn from 'react-fade-in';
import { Container } from 'semantic-ui-react'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setStudentClassrooms, setStudentsInClassrooms } from '../store/studentSlice';
import { setClassroomID } from '../store/classroomSlice';

interface StudentHomeContainerProps {
    currentUser: any;
}

const StudentHomeContainer: React.FC<StudentHomeContainerProps> = ({ currentUser }) => {
    const dispatch = useAppDispatch();
    const studentClassrooms = useAppSelector(state => state.student.studentClassrooms);

    useEffect(() => {
        if (!currentUser?.id) return;

        findAllStudentClassrooms(currentUser.id)
            .then(data => dispatch(setStudentClassrooms(data)))
    }, [currentUser?.id, dispatch])

    const setLessonState = (id: string) => {
        dispatch(setClassroomID(id))
    }

    const renderClassrooms = () => {
        if (studentClassrooms && Array.isArray(studentClassrooms)) {
            return <Virtuoso 
                style={{ width: '1050px', height: '300px' }} 
                totalCount={1} 
                item={() => <div>
                    {studentClassrooms.map((classroom: any) => {
                        return <Classroom 
                            key={classroom.id} 
                            id={classroom.id}
                            name={classroom.name} 
                            student={true}
                            setLessonState={setLessonState}
                            student_id={currentUser?.id}/>
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