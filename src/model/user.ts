export class User {
    public accountName: string
    public id: string
    public fullName: string
    public token: string
    public domain:string
    constructor() {
        this.domain =""
        this.fullName = ""
        this.accountName = ""
        this.id = ""
    }

    setId(id: string) {
        this.id = id
    }
}