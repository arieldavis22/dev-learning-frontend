export default function lesson(state = {
    classroomLessons: [],
    CLesson: {},
    lessonID: "",
}, action) {

    switch(action.type) {
        case "SET_CLASSROOM_LESSONS":
            return {...state, classroomLessons: action.lessons}

        case "SET_C_LESSON":
            return {...state, CLesson: action.lesson}

        case "SET_LESSON_ID":
            return {...state, lessonID: action.lessonId}

        default:
            return state
    }
}