export default function classroom(state = {
    classroom: [],
    classroomName: '',
    classroomID: '',
    allClassrooms: [],
}, action) {
    switch(action.type) {
        case "SET_CLASSROOM":
            return {...state, classroom: action.classroom}

        case "ADD_CLASSROOM":
            return {...state, classroom: [...state.classroom, action.classroom]}

        case "SET_CLASSROOM_ID":
            return {...state, classroomID: action.classID}    

        case "SET_CLASSROOM_NAME":
            return {...state, classroomName: action.name}

        case "SET_ALL_CLASSROOMS":
            return {...state, allClassrooms: action.classrooms}

        default:
            return state
    }
}