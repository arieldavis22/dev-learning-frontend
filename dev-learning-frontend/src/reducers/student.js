export default function student(state = {
    allStudents: [],
    studentClassrooms: [],
    studentsInClassroom: []
}, action) {

    switch(action.type) {
        case "SET_STUDENTS":
            return {...state, allStudents: action.students}

        case "SET_STUDENT_CLASSROOMS":
            return {...state, studentClassrooms: action.classrooms}

        case "SET_STUDENTS_IN_CLASSROOMS":
            return {...state, studentsInClassroom: action.students}

        default:
            return state
    }
}