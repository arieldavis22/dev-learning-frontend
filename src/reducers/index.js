import { combineReducers } from 'redux'
import classroom from './classroom'
import student from './student'
import teacher from './teacher'
import lesson from './lesson'
import user from './user'
import app from './app'

const rootReducer = combineReducers({
    classroom,
    student,
    teacher,
    lesson,
    user,
    app

})

export default rootReducer