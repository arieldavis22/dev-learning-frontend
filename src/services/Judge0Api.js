import URL from './index'

export function checkCodeJudge(state) {
    return fetch(URL + "check-code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(state)
    })
    .then(r => r.json())
}

export function correctAnswerJudge(classroom_id, student_id, points) {
    return fetch(URL + "correct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            classroom_id: classroom_id,
            student_id: student_id,
            points: points
        })
    })
    .then(r => r.json())
}

export function wrongAnswerJudge(classroom_id, student_id, points) {
    return fetch(URL + "wrong", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            classroom_id: classroom_id,
            student_id: student_id,
            points: points
        })
    })
    .then(r => r.json())
}

export function testCodeJudge(code, lesson_lang) {
    return fetch(URL + "test-code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            code: code,
            lesson_lang: lesson_lang
        })
    })
    .then(r => r.json())
}