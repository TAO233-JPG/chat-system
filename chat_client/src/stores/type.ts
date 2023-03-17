export type UserT = {
  name: string
  id: string
  chatRoomId: string[]
}

export type ChatRoomTypeT = 'Group' | 'Private' | 'Recent'

// export interface Imessage {
//   roomId: string
//   sender: { id: string; name: string; message: string }
// }

export interface Imessage {
  id: string
  content: string
  date: any
  senderId: string
  senderName: string
  // chatRoomId: string;
}

export interface IChatRoom {
  id: string
  name: string
  roomType: ChatRoomTypeT
  users: UserT[]
  chatRecord: Imessage[]
}

export interface IinitData {
  chatRooms: IChatRoom[]
}

export interface IgetRecordData {
  record: Imessage[]
  roomId: string
}
