export enum RoomType {
  'Group',
  'Private',
}

export interface Iuser {
  id: string;
  name: string;
  password: string;
  clientId?: string | undefined;
  chatRoomId: string[];
}

export interface Imessage {
  id: string;
  content: string;
  date: any;
  senderId: string;
  senderName: string;
  // chatRoomId: string;
}

export interface IchatRoom {
  id: string;
  name: string;
  users: Record<string, Iuser>;
  chatRecord: Imessage[];
  roomType: RoomType;
}
