import { Member } from './member'
import {RoomSetting} from './roomSetting' 
import { BaseModel } from './baseModel'

export class Room extends BaseModel {
    public moduleCode: string
    public createByFullName: string
    public numberOfNotices: number
    public countMember: number
    public lastChatDate: Date
    public actionIds: Array<number>
    public members: Array<Member>
    public settings: Array<RoomSetting>
    constructor() {
        super()
    }
}