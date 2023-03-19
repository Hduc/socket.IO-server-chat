import { BaseModel } from "./baseModel"

export class Member extends BaseModel {
    public roomId: string
    public timeDueDisableNotification: Date = null
    public numberOfNotices: number
    public fullName: string
    constructor() {
        super()
    }
}