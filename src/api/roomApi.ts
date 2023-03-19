import axios from 'axios'
import endpoint from '../../endpoints.config'
import { handleResponse, handleError } from "./apiUtils"
import { Room, Member } from '../model'
const baseUrl = endpoint.UrlApi + '/room/'

export class RoomApi {
    getRooms(id: string, token: string) {
        token
        return axios({
            url: baseUrl + (id || ""),
            headers: {
                Cookie: token
            },
            withCredentials: true
        })
            .then(handleResponse)
            .catch(handleError)
    }

    saveRoom(room: Room, token: string) {
        return axios({
            url: baseUrl + (room.id || ""),
            method: room.id ? "PUT" : "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `token ${token}`
            },
            withCredentials: true,
            data: room
        })
            .then(handleResponse)
            .catch(handleError);
    }

    deleteRoom(id: string) {
        return axios({
            url: baseUrl + id,
            method: "DELETE"
        })
            .then(handleResponse)
            .catch(handleError)
    }

    addMember(roomId: string, members: Array<Member>, token: string) {
        return axios({
            url: baseUrl + 'members',
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `key=kyg5cn3rtARkPIfZYDLywHgElgpzwBaQwSMeEw9IW4dMZBzHi1OjLLwXJ56O5kPEg0-hjRq79hXiavL7r4jxHvr0qsIod841zAO0QqdA0ec1`
            },
            data: {
                roomId: roomId,
                members: members
            }
        })
            .then(handleResponse)
            .catch(handleError);
    }

    deletedMember(userDelete: string, authorized: string, token: string) {
        return axios({
            url: baseUrl + 'member',
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "Authorization": `token ${token}`
            },
            data: {
                user: userDelete,
                authorized: authorized
            }
        }).then(handleResponse)
            .catch(handleError)
    }
}