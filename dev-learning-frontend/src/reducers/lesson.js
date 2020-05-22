export default function lesson(state = {
    classroomLessons: [],
    CLesson: {},
    lessonID: "",
    console: [],
    lessonReports: []
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

        case "SET_LESSON_REPORTS":
            return {...state, lessonReports: action.report}

        default:
            return state
    }
}