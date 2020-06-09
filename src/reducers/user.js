export default function user(state ={
    currentUser: ""
}, action) {
    switch(action.type) {
        case "SET_USER":
            return {...state, currentUser: action.user}
        case "UNSET_USER":
            return {...state, currentUser: "" }

        default:
            return state
    }
}