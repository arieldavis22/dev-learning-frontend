import URL from './index'

export function findLessons(id, id2) {
    return fetch(URL + "find-lessons", {
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
    return fetch(URL + "find-all-lessons", {
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
    return fetch(URL + "newlesson", {
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
    return fetch(URL + "new-report", {
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
    return fetch(URL + "all-lessons", {
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
    return fetch(URL + "all-lessons", {
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
    return fetch(URL + "reports-for-lesson", {
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
    return fetch(URL + "delete-report", {
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