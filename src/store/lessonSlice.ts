import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LessonState {
  classroomLessons: any[];
  CLesson: Record<string, any>;
  lessonID: string;
  console: any[];
  lessonReports: any[];
  stackAnswers: any[];
}

const initialState: LessonState = {
  classroomLessons: [],
  CLesson: {},
  lessonID: '',
  console: [],
  lessonReports: [],
  stackAnswers: [],
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setClassroomLessons: (state, action: PayloadAction<any[]>) => {
      state.classroomLessons = action.payload;
    },
    setCLesson: (state, action: PayloadAction<Record<string, any>>) => {
      state.CLesson = action.payload;
    },
    setLessonID: (state, action: PayloadAction<string>) => {
      state.lessonID = action.payload;
    },
    addLogToConsole: (state, action: PayloadAction<any>) => {
      state.console.push(action.payload);
    },
    clearLog: (state) => {
      state.console = [];
    },
    setLessonReports: (state, action: PayloadAction<any[]>) => {
      state.lessonReports = action.payload;
    },
    setStackAnswers: (state, action: PayloadAction<any[]>) => {
      state.stackAnswers = action.payload;
    },
  },
});

export const {
  setClassroomLessons,
  setCLesson,
  setLessonID,
  addLogToConsole,
  clearLog,
  setLessonReports,
  setStackAnswers,
} = lessonSlice.actions;

export default lessonSlice.reducer;
