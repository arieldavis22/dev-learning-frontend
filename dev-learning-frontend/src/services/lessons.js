export function findLessons(id, id2) {
    return fetch("http://localhost:3000/find-lessons", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            classroom_id: id,
            student_id: id2
        })
    })
    .then(r => r.json())
}

export function findAllLessons(id) {
    return fetch("http://localhost:3000/find-all-lessons", {
        method: "POST",
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

//find-all-lessons

export function newLesson(state) {
    return fetch("http://localhost:3000/newlesson", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(state)
    })
    .then(r => r.json())
}

export function reportLesson(state) {
    return fetch("http://localhost:3000/new-report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(state)
    })
    .then(r => r.json())
}

export function allLessons(teacher_id) {
    return fetch("http://localhost:3000/all-lessons", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            teacher_id: teacher_id
        })
    })
    .then(r => r.json())
}

export function allLessonsForTeacher(teacher_id, classroom_id) {
    return fetch("http://localhost:3000/all-lessons", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            teacher_id: teacher_id,
            classroom_id: classroom_id
        })
    })
    .then(r => r.json())
}

export function allReportsForLesson(lesson_id) {
    return fetch("http://localhost:3000/reports-for-lesson", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            lesson_id: lesson_id
        })
    })
    .then(r => r.json())
}

export function removeReportForLesson(report_id) {
    return fetch("http://localhost:3000/delete-report", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            report_id: report_id
        })
    })
    .then(r => r.json())
}