import axios from "axios";
import { getLocalUser } from "./Auth";

const baseUrl = process.env.REACT_APP_API_ADDRESS

export async function getAreas(placeId, sort, limit, search) {
    sort = (typeof sort !== 'undefined') ?  sort : "desc"
    limit = (typeof limit !== 'undefined') ?  limit : 50
    search = (typeof search !== 'undefined') ?  search : ""
    const token = getLocalUser() === false ? getLocalUser : getLocalUser().token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const data = axios.get(baseUrl + "/areas.php?place=" + placeId + "&sort=" + sort + "&limit=" + limit, config).then(Response => {return Response.data})
    return data
}

export function getArea(id) {
    const token = getLocalUser() === false ? getLocalUser : getLocalUser().token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const promise = axios.get(baseUrl + "/areas.php?id=" + id, config)
    const data = promise.then(Response => {return Response.data})
    return data
}