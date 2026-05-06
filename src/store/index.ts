import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import classroomReducer from './classroomSlice';
import lessonReducer from './lessonSlice';
import studentReducer from './studentSlice';
import teacherReducer from './teacherSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    classroom: classroomReducer,
    lesson: lessonReducer,
    student: studentReducer,
    teacher: teacherReducer,
    user: userReducer,
  },
});

// Export types for use in the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
