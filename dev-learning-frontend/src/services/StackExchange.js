import URL from './index'

export function searchStackAPI(state) {
    return fetch(URL + "search-stack", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(state)
    })
    .then(r => r.json())
}