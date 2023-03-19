import * as express from "express"
import * as cors from "cors"
import * as https from "https"
import * as http from "http"
import * as fs from 'fs'
import * as path from 'path'
import endpoint from '../endpoints.config'

import { ChatSocket } from "./socket"

export class Server {
    private app: express.Application
    private server: https.Server
    //private server: http.Server
    private io: SocketIO.Server
    private port: string | number

    constructor() {
        this.createApp()
        this.config()
        this.createServer()
        this.sockets()
        this.listen()
    }

    private createApp(): void {
        this.app = express()
        this.app.use(cors())
    }

    private createServer(): void {
        //const config = {
        //    key: fs.readFileSync(path.resolve(__dirname, '../ssl/server.key')),
        //    cert: fs.readFileSync(path.resolve(__dirname, '../ssl/server.crt'))
        //}
        var config = {
            pfx: fs.readFileSync(path.resolve(__dirname, '../ssl/server.pfx')),
            passphrase: endpoint.PasswSsl
        };
        this.server = https.createServer(config, this.app)

        //this.server = http.createServer(this.app)
    }

    private config(): void {
        this.port = endpoint.Port
    }

    private sockets(): void {
        this.io = require("socket.io")(this.server, {
            cors: {
                origin: '*'
            }
        })
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log("Running server on port %s", this.port)
        })

        this.io.on("connect", (socket: any) => {
            new ChatSocket(socket, this.io).init()
        })
    }

    public getApp(): express.Application {
        return this.app
    }
}