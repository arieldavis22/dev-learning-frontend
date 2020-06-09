import URL from './index'

export function autologin() {
    return fetch(URL + "autologin", {
        credentials: 'include'
    })
    .then(r => {
        if(r.ok) {
            return r.json()
        } else{
            throw r
        }
    })
}

export function logout() {
    return fetch(URL + "logout", {
        method: "POST",
        credentials: 'include'
    })
    .then(r => r.json())
}

export function findStudents(id) {
    return fetch(URL + "find-students", {
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

export function findStudentGpa(classroom_id, student_id) {
    return fetch(URL + "find-student-gpa", {
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

export function removeStudent(classroom_id, student_id) {
    return fetch(URL + "remove-student", {
        method: "DELETE",
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

export function login(state) {
    return fetch(URL + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(state)
    })
    .then(r => {
        if(r.ok) {
            return r.json()
        } else {
            throw r
        }
    })
}

export function signup(state) {
    return fetch(URL + "signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(state)
    })
    .then(r => {
        if(r.ok) {
            return r.json()
        } else {
            throw r
        }
    })
}

export function findStudentGPA(classroom_id, student_id) {
    return fetch(URL + "find-student-gpa", {
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

export function allTeacherLessons(teacher_id) {
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

export function allStudentsInClassroom(classroom_id) {
    return fetch(URL + "all-students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            classroom_id: classroom_id
        })
    })
    .then(r => r.json())

}

export function editUser(state) {
    return fetch(URL + "edit-user", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(state)
    })
    .then(r => r.json())
}

export function findAllStudentClassrooms(student_id) {
    return fetch(URL + "find-classrooms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            student_id: student_id
        })
    })
    .then(r => r.json())
}

export function findAllTeachers(teacher_id) {
    return fetch(URL + "all-teachers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
            teacher_id: teacher_id
        })
    })
    .then(r => r.json())
}

export function allTeacherFollowing(teacher_id) {
    return fetch(URL + "following", {
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

export function followTeacher(follower, followee) {
    return fetch(URL + "follow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            follower_id: follower,
            followee_id: followee
        })
    })
    .then(r => r.json())
}