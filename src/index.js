"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
const endpoints_config_1 = require("../endpoints.config");
const socket_1 = require("./socket");
class Server {
    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    createApp() {
        this.app = express();
        this.app.use(cors());
    }
    createServer() {
        //const config = {
        //    key: fs.readFileSync(path.resolve(__dirname, '../ssl/server.key')),
        //    cert: fs.readFileSync(path.resolve(__dirname, '../ssl/server.crt'))
        //}
        var config = {
            pfx: fs.readFileSync(path.resolve(__dirname, '../ssl/server.pfx')),
            passphrase: endpoints_config_1.default.PasswSsl
        };
        this.server = https.createServer(config, this.app);
        //this.server = http.createServer(this.app)
    }
    config() {
        this.port = endpoints_config_1.default.Port;
    }
    sockets() {
        this.io = require("socket.io")(this.server, {
            cors: {
                origin: '*'
            }
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log("Running server on port %s", this.port);
        });
        this.io.on("connect", (socket) => {
            new socket_1.ChatSocket(socket, this.io).init();
        });
    }
    getApp() {
        return this.app;
    }
}
exports.Server = Server;
//# sourceMappingURL=index.js.map