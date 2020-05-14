export default function userReducer(state ={
    currentUser: null,
    isTeacher: false
}, action) {
    switch(action.type) {
        case "SET_USER":
            console.log("testing", action)
            return {currentUser: action.user}
        case "UNSET_USER":
            return {currentUser: null}
        case "IS_TEACHER":
            return {isTeacher: true}

        default:
            return state
    }
}