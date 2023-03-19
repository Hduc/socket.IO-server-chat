import { BaseModel } from "./baseModel"

export class Interactive extends BaseModel {
    public roomId: string
    public chatId: string
    public value: string
    public isDelete: boolean
    public action: number
    public createdByFullName:string
    constructor() {
        super()
    }
}