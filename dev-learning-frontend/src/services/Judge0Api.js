export function checkCodeJudge(state) {
    return fetch("http://localhost:3000/check-code", {
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
    return fetch("http://localhost:3000/correct", {
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
    return fetch("http://localhost:3000/wrong", {
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
    return fetch("http://localhost:3000/test-code", {
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