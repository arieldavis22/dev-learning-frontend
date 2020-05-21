export default function lesson(state = {
    classroomLessons: [],
    CLesson: {},
    lessonID: "",
    console: []
}, action) {

    switch(action.type) {
        case "SET_CLASSROOM_LESSONS":
            return {...state, classroomLessons: action.lessons}

        case "SET_C_LESSON":
            return {...state, CLesson: action.lesson}

        case "SET_LESSON_ID":
            return {...state, lessonID: action.lessonId}

        case "ADD_LOG_TO_CONSOLE":
            return {...state, console: [...state.console, action.line]}

        case "CLEAR_LOG":
            return {...state, console: []}

        default:
            return state
    }
}