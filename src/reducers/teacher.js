export default function teacher(state = {
    teacherLessons: [],
    allTeachers: [],
    followedTeachers: [],
}, action) {

    switch(action.type) {
        case "SET_TEACHER_LESSONS":
            return {...state, teacherLessons: action.lessons}
            
        case "SET_ALL_TEACHERS":
            return {...state, allTeachers: action.teachers}

        case "SET_FOLLOWED_TEACHERS":
            return {...state, followedTeachers: action.teachers}

        case "ADD_FOLLOWED_TEACHER":
            return {...state, followedTeachers: [...state.followedTeachers, action.teacher]}

        default:
            return state
    }
}