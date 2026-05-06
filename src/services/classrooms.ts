import { ClassroomEditState } from "../types/classroom.types";
import URL from "./index";

export function editClassroom(state: ClassroomEditState) {
  return fetch(URL + "edit-classroom", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(state),
  }).then((r) => r.json());
}

export function newClassroom(state) {
  return fetch(URL + "new-classroom", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(state),
  }).then((r) => r.json());
}

export function allClassooms(id: string) {
  return fetch(URL + "all-classrooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      id: id,
    }),
  }).then((r) => r.json());
}

export function addStudentToClassroom(
  classroom_id: string,
  student_id: string,
) {
  return fetch(URL + "add-student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      classroom_id: classroom_id,
      student_id: student_id,
    }),
  }).then((r) => r.json());
}

export function addLessonToClassroom(classroom_id: string, lesson_id: string) {
  return fetch(URL + "lesson-classroom", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      classroom_id: classroom_id,
      lesson_id: lesson_id,
    }),
  }).then((r) => r.json());
}

export function removeClassroom(id: string) {
  return fetch(URL + "remove-classroom", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      classroom_id: id,
    }),
  }).then((r) => r.json());
}
