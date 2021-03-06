import axios from "axios";
import { getLocalUser } from "./Auth";

const baseUrl = process.env.REACT_APP_API_ADDRESS

export async function getPlaces(sort, limit, search) {
    sort = (typeof sort !== 'undefined') ?  sort : "desc"
    limit = (typeof limit !== 'undefined') ?  limit : 10
    search = (typeof search !== 'undefined') ?  search : ""
    const token = getLocalUser() === false ? getLocalUser : getLocalUser().token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const data = axios.get(baseUrl + "/places.php?sort=" + sort + "&limit=" + limit, config).then(Response => {return Response.data})
    return data
}

export function getPlace(id) {
    const token = getLocalUser() === false ? getLocalUser : getLocalUser().token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.get(baseUrl + "/places.php?id=" + id, config)
    const data = promise.then(Response => {return Response.data})
    return data
}