export default function userReducer(state ={
    currentUser: "",
    classroom: [],
    classroomName: '',
    classroomID: '',
    allStudents: [],
    studentClassrooms: []
}, action) {
    switch(action.type) {
        case "SET_USER":
            console.log("testing", action)
            return {...state, currentUser: action.user}
        case "UNSET_USER":
            return {...state, currentUser: "" }

        case "SET_CLASSROOM":
            return {...state, classroom: action.classroom}
        case "ADD_CLASSROOM":
            return {...state, classroom: [...state.classroom, action.classroom]}

        case "SET_CLASSROOM_ID":
            return {...state, classroomID: action.classID}        
        case "SET_CLASSROOM_NAME":
            return {...state, classroomName: action.name}

        case "SET_STUDENTS":
            return {...state, allStudents: action.students}

        case "SET_STUDENT_CLASSROOMS":
            return {...state, studentClassrooms: action.classrooms}


        default:
            return state
    }
}