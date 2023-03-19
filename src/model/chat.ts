import { BaseModel } from './baseModel'
import {Attachment} from './attachment'
import { Interactive } from './interactive'
export class Chat extends BaseModel {
    public roomId: string
    public value: string
    public parentId: string
    public beforeChange: string
    public createByFullName: string
    public createByJobTitle: string
    public typeData: number
    public attachments: Array<Attachment>
    public interactives: Array<Interactive>
    constructor() {
        super()
    }
}