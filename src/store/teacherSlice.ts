import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TeacherState {
  teacherLessons: any[];
  allTeachers: any[];
  followedTeachers: any[];
}

const initialState: TeacherState = {
  teacherLessons: [],
  allTeachers: [],
  followedTeachers: [],
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeacherLessons: (state, action: PayloadAction<any[]>) => {
      state.teacherLessons = action.payload;
    },
    setAllTeachers: (state, action: PayloadAction<any[]>) => {
      state.allTeachers = action.payload;
    },
    setFollowedTeachers: (state, action: PayloadAction<any[]>) => {
      state.followedTeachers = action.payload;
    },
    addFollowedTeacher: (state, action: PayloadAction<any>) => {
      state.followedTeachers.push(action.payload);
    },
  },
});

export const {
  setTeacherLessons,
  setAllTeachers,
  setFollowedTeachers,
  addFollowedTeacher,
} = teacherSlice.actions;

export default teacherSlice.reducer;
