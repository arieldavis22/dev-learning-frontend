export default function user(state ={
    currentUser: "",
    // classroom: [],
    // classroomName: '',
    // classroomID: '',
    // allStudents: [],
    // studentClassrooms: [],
    // teacherLessons: [],
    // classroomLessons: [],
    // CLesson: {},
    // allTeachers: [],
    // followedTeachers: [],
    // lessonID: "",
    // allClassrooms: [],
    // studentsInClassroom: []
}, action) {
    switch(action.type) {
        case "SET_USER":
            return {...state, currentUser: action.user}
        case "UNSET_USER":
            return {...state, currentUser: "" }

        // case "SET_CLASSROOM":
        //     return {...state, classroom: action.classroom}
        // case "ADD_CLASSROOM":
        //     return {...state, classroom: [...state.classroom, action.classroom]}

        // case "SET_CLASSROOM_ID":
        //     return {...state, classroomID: action.classID}        
        // case "SET_CLASSROOM_NAME":
        //     return {...state, classroomName: action.name}

        // case "SET_STUDENTS":
        //     return {...state, allStudents: action.students}

        // case "SET_STUDENT_CLASSROOMS":
        //     return {...state, studentClassrooms: action.classrooms}

        // case "SET_TEACHER_LESSONS":
        //     return {...state, teacherLessons: action.lessons}

        // case "SET_CLASSROOM_LESSONS":
        //     return {...state, classroomLessons: action.lessons}

        // case "SET_C_LESSON":
        //     return {...state, CLesson: action.lesson}

        // case "SET_ALL_TEACHERS":
        //     return {...state, allTeachers: action.teachers}

        // case "SET_FOLLOWED_TEACHERS":
        //     return {...state, followedTeachers: action.teachers}

        // case "SET_LESSON_ID":
        //     return {...state, lessonID: action.lessonId}

        // case "SET_ALL_CLASSROOMS":
        //     return {...state, allClassrooms: action.classrooms}

        // case "SET_STUDENTS_IN_CLASSROOMS":
        //     return {...state, studentsInClassroom: action.students}

        default:
            return state
    }
}