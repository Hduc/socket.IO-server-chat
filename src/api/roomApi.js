"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomApi = void 0;
const axios_1 = require("axios");
const endpoints_config_1 = require("../../endpoints.config");
const apiUtils_1 = require("./apiUtils");
const baseUrl = endpoints_config_1.default.UrlApi + '/room/';
class RoomApi {
    getRooms(id, token) {
        token;
        return axios_1.default({
            url: baseUrl + (id || ""),
            headers: {
                Cookie: token
            },
            withCredentials: true
        })
            .then(apiUtils_1.handleResponse)
            .catch(apiUtils_1.handleError);
    }
    saveRoom(room, token) {
        return axios_1.default({
            url: baseUrl + (room.id || ""),
            method: room.id ? "PUT" : "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `token ${token}`
            },
            withCredentials: true,
            data: room
        })
            .then(apiUtils_1.handleResponse)
            .catch(apiUtils_1.handleError);
    }
    deleteRoom(id) {
        return axios_1.default({
            url: baseUrl + id,
            method: "DELETE"
        })
            .then(apiUtils_1.handleResponse)
            .catch(apiUtils_1.handleError);
    }
    addMember(roomId, members, token) {
        return axios_1.default({
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
            .then(apiUtils_1.handleResponse)
            .catch(apiUtils_1.handleError);
    }
    deletedMember(userDelete, authorized, token) {
        return axios_1.default({
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
        }).then(apiUtils_1.handleResponse)
            .catch(apiUtils_1.handleError);
    }
}
exports.RoomApi = RoomApi;
//# sourceMappingURL=roomApi.js.map