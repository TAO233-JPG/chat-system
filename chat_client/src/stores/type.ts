export type UserT = {
  name: string
  id: string
  chatRoomId: string[]
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
