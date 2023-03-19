"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSocket = void 0;
const _ = require("lodash");
//import * as winston from 'winston'
//const logger = winston.createLogger({
//    level: 'info',
//    format: winston.format.json(),
//    transports: [
//        new winston.transports.File({ filename: 'error.log', level: 'error' }),
//        new winston.transports.File({ filename: 'info.log', level: 'info' }),
//        new winston.transports.File({ filename: 'debug.log', level: 'debug' })
//    ]
//})
var users = [];
class ChatSocket {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
    }
    init() {
        this.socket.on("sign-in", (data) => {
            data.id = this.socket.id;
            users.push(data);
            const dataFilter = users.reduce((filtered, item) => {
                if (item.accountName !== undefined && item.domain == data.domain) {
                    filtered.push({
                        account: item.accountName,
                        name: item.fullName
                    });
                }
                return filtered;
            }, []);
            const dataDistinct = [...new Set(dataFilter)];
            this.io.local.emit('user-online', dataDistinct);
        });
        this.socket.on("disconnect", () => {
            let index = _.findIndex(users, ({ id }) => id == this.socket.id);
            if (index > -1) {
                const current = users[index];
                users = [...users.slice(0, index), ...users.slice(index + 1)];
                const dataFilter = users.reduce((filtered, item) => {
                    if (item.accountName !== undefined && item.domain == current.domain) {
                        filtered.push({
                            account: item.accountName,
                            name: item.fullName
                        });
                    }
                    return filtered;
                }, []);
                const dataDistinct = [...new Set(dataFilter)];
                this.io.local.emit('user-online', dataDistinct);
            }
        });
        this.socket.on('join-rooms', (rooms) => {
            this.socket.join(rooms);
        });
        this.socket.on('leave-room', (roomId) => {
            this.socket.leave(roomId);
        });
        this.socket.on('add-room', (room) => {
            let index = _.findIndex(users, ({ id }) => id == this.socket.id);
            const current = users[index];
            this.socket.join(room.id);
            room.members.forEach((member) => {
                let userOnlineIndex = _.findIndex(users, ({ accountName, domain }) => accountName == member.createdBy && domain == current.domain);
                if (userOnlineIndex > -1) {
                    let userOnline = users[userOnlineIndex];
                    this.io.to(userOnline.id).emit('add-room', room);
                }
            });
        });
        this.socket.on('edit-room', (room) => {
            this.socket.to(room.id).emit('edit-room', room);
        });
        this.socket.on('delete-room', (roomId) => {
            this.socket.to(roomId).emit('delete-room', roomId);
        });
        this.socket.on('change-user-room', (args) => {
            let index = _.findIndex(users, ({ id }) => id == this.socket.id);
            const current = users[index];
            if (args.newMember == null)
                args.newMember = [];
            if (args.deleteMember == null)
                args.deleteMember = [];
            args.newMember.forEach((member) => {
                let userOnlineIndex = _.findIndex(users, ({ accountName, domain }) => accountName == member && domain == current.domain);
                if (userOnlineIndex > -1) {
                    let userOnline = users[userOnlineIndex];
                    this.io.to(userOnline.id).emit('add-room', args.room);
                }
            });
            args.deleteMember.forEach((member) => {
                let userOnlineIndex = _.findIndex(users, ({ accountName, domain }) => accountName == member && domain == current.domain);
                if (userOnlineIndex > -1) {
                    let userOnline = users[userOnlineIndex];
                    this.io.to(userOnline.id).emit('delete-room', args.room);
                }
            });
        });
        this.socket.on('add-chat', (chat) => {
            this.socket.to(chat.roomId).emit('add-chat', chat);
        });
        this.socket.on('edit-chat', (chat) => {
            this.socket.to(chat.roomId).emit('edit-chat', chat);
        });
        this.socket.on('delete-chat', (args) => {
            this.socket.to(args.roomId).emit('delete-chat', { roomId: args.roomId, chatId: args.chatId });
        });
        this.socket.on('interactive', (interactive) => {
            this.socket.to(interactive.roomId).emit('interactive', interactive);
        });
    }
}
exports.ChatSocket = ChatSocket;
//# sourceMappingURL=chat.js.map