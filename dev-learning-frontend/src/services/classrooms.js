export function editClassroom(state) {
    return fetch("http://localhost:3000/edit-classroom", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(state)
    })
    .then(r => r.json())
}

export function newClassroom(state) {
    return fetch("http://localhost:3000/new-classroom", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(state)
    })
    .then(r => r.json())
}

export function allClassooms(id) {
    return fetch("http://localhost:3000/all-classrooms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            id: id
        })
    })
    .then(r => r.json())
}

export function addStudentToClassroom(classroom_id, student_id) {
    return fetch("http://localhost:3000/add-student", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            classroom_id: classroom_id,
            student_id: student_id
        })
    })
    .then(r => r.json())
}

export function addLessonToClassroom(classroom_id, lesson_id) {
    return fetch("http://localhost:3000/lesson-classroom", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            classroom_id: classroom_id,
            lesson_id: lesson_id
        })
    })
    .then(r => r.json())
}

export function removeClassroom(id) {
    return fetch("http://localhost:3000/remove-classroom", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            classroom_id: id
        })
    })
    .then(r => r.json())
}