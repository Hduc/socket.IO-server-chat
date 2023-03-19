import { BaseModel } from './baseModel'
export class Attachment extends BaseModel {
    public chatId: string
    public value: string
    public fileExt: string
    public url: string
    public uniqueName:string
    constructor() {
        super()
    }
}