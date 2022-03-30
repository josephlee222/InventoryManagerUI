import axios from "axios";
import { Navigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_ADDRESS

export function loginUser(username, password) {
    var userData = new FormData()

    userData.append("username", username)
    userData.append("password", password)

    const promise = axios.post(baseUrl + "/auth.php?type=login", userData)
    const data = promise.then(Response => {return Response.data})
    return data
}

export function logoutUser() {
    localStorage.removeItem("user")
    return <Navigate to={"/"}/>
}

export function getLocalUser() {
    if (localStorage.getItem("user") === null) {
        return false
    } else {
        return JSON.parse(localStorage.getItem("user"))
    }
}