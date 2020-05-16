export default function userReducer(state ={
    currentUser: "",
    classroom: []
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
        

        default:
            return state
    }
}