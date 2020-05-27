export function autologin() {
    return fetch("http://localhost:3000/autologin", {
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
    return fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: 'include'
    })
    .then(r => r.json())
}

export function findStudents(id) {
    return fetch("http://localhost:3000/find-students", {
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
    return fetch("http://localhost:3000/find-student-gpa", {
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
    return fetch("http://localhost:3000/remove-student", {
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
    return fetch("http://localhost:3000/login", {
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
    return fetch("http://localhost:3000/signup", {
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
    return fetch("http://localhost:3000/find-student-gpa", {
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

export function allStudentsInClassroom(classroom_id) {
    return fetch("http://localhost:3000/all-students", {
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
    return fetch("http://localhost:3000/edit-user", {
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
    return fetch("http://localhost:3000/find-classrooms", {
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
    return fetch("http://localhost:3000/all-teachers", {
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
    return fetch("http://localhost:3000/following", {
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
    return fetch("http://localhost:3000/follow", {
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