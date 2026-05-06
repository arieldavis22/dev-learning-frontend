import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StudentState {
  allStudents: any[];
  studentClassrooms: any[];
  studentsInClassroom: any[];
}

const initialState: StudentState = {
  allStudents: [],
  studentClassrooms: [],
  studentsInClassroom: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<any[]>) => {
      state.allStudents = action.payload;
    },
    setStudentClassrooms: (state, action: PayloadAction<any[]>) => {
      state.studentClassrooms = action.payload;
    },
    setStudentsInClassrooms: (state, action: PayloadAction<any[]>) => {
      state.studentsInClassroom = action.payload;
    },
  },
});

export const { setStudents, setStudentClassrooms, setStudentsInClassrooms } =
  studentSlice.actions;

export default studentSlice.reducer;
