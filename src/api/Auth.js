import axios from "axios";

const baseUrl = process.env.REACT_APP_API_ADDRESS

export function loginUser(username, password) {
    var userData = new FormData()

    userData.append("username", username)
    userData.append("password", password)

    const promise = axios.post(baseUrl + "/auth.php?type=login", userData)
    const data = promise.then(Response => {return Response.data})
    return data
}

export function getLocalUser() {
    if (localStorage.getItem("user") === null) {
        return false
    } else {
        return JSON.parse(localStorage.getItem("user"))
    }
}