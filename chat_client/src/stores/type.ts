export type UserT = {
  username: string
  uId: string
  chatRooms: ChatRoomT[]
}

export type ChatRoomTypeT = 'Group' | 'Private' | 'Recent'

export type ChatRoomT = {
  cId: string
  name: string
  type: ChatRoomTypeT
}

export type MessageT = {
  uId: string
  name: string
  messageContent: string
  sendingTime?: Date // TODO: 时间类型需要修改
}
