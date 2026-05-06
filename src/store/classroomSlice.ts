import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClassroomState {
  classroom: any[];
  classroomName: string;
  classroomID: string;
  allClassrooms: any[];
}

const initialState: ClassroomState = {
  classroom: [],
  classroomName: '',
  classroomID: '',
  allClassrooms: [],
};

const classroomSlice = createSlice({
  name: 'classroom',
  initialState,
  reducers: {
    setClassroom: (state, action: PayloadAction<any[]>) => {
      state.classroom = action.payload;
    },
    addClassroom: (state, action: PayloadAction<any>) => {
      state.classroom.push(action.payload);
    },
    setClassroomID: (state, action: PayloadAction<string>) => {
      state.classroomID = action.payload;
    },
    setClassroomName: (state, action: PayloadAction<string>) => {
      state.classroomName = action.payload;
    },
    setAllClassrooms: (state, action: PayloadAction<any[]>) => {
      state.allClassrooms = action.payload;
    },
  },
});

export const {
  setClassroom,
  addClassroom,
  setClassroomID,
  setClassroomName,
  setAllClassrooms,
} = classroomSlice.actions;

export default classroomSlice.reducer;
