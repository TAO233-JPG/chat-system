// 没有使用数据库，所以数据存在内存中。
import { IchatRoom, Imessage, Iuser, RoomType } from './type';

interface Idata {
  users: Record<string, Iuser>;
  chatRooms: Record<string, IchatRoom>;
}

export default class DataStore {
  private data: Idata;
  private static instance: DataStore;

  private constructor(data: Idata) {
    this.data = data;
  }

  public static getInstance(
    data: Idata = { users: {}, chatRooms: {} },
  ): DataStore {
    if (!this.instance) {
      this.instance = new DataStore(data);
    }
    return this.instance;
  }

  addUser(user: Iuser) {
    const { id } = user;
    const { users } = this.data;
    if (users[id]) {
      return '当前用户以存在';
    }
    users[id] = user;
    return '添加用户成功';
  }

  // 聊天室相关操作
  addUserToChatRoom(user: Iuser, roomId: string) {
    const { chatRooms, users } = this.data;
    if (!chatRooms[roomId]) {
      return '聊天室不存在';
    }
    if (!chatRooms[roomId][user.id]) {
      return '用户已存在';
    }
    chatRooms[roomId][user.id] = user;
    users[user.id].chatRoomId.push(roomId);
  }

  deleteUserFromChatRoom(user: Iuser, roomId: string) {
    const { chatRooms, users } = this.data;
    if (!chatRooms[roomId]) {
      return '聊天室不存在';
    }
    delete chatRooms[roomId][user.id];
    const userChatRoom = users[user.id].chatRoomId;
    const idx = userChatRoom.indexOf(roomId);
    if (idx >= 0) {
      userChatRoom.splice(idx, 1);
    }
    return '已删除用户';
  }

  getAllUsers() {
    const { users } = this.data;
    return users;
  }
  getUser(id: string): Iuser | undefined {
    return this.data.users[id];
  }

  getUserChatRooms(id: string) {
    const { chatRooms, users } = this.data;
    const userCharRoomIds = users[id].chatRoomId;
    const userCharRooms = userCharRoomIds.map(
      (chatRoomId) => chatRooms[chatRoomId],
    );

    return userCharRooms;
  }

  setClientId(id: string, clientId: string | undefined) {
    const user = this.getUser(id);
    user && (user.clientId = clientId);
  }
  getAllChatRooms() {
    const { chatRooms } = this.data;
    return chatRooms;
  }

  getChatRoomUsers(roomId: string) {
    return this.data.chatRooms[roomId].users;
  }

  // 保存聊天记录
  saveChatRecord(chatRoomId: string, message: Imessage) {
    const { chatRooms } = this.data;
    chatRooms[chatRoomId].chatRecord.push(message);
    return message;
  }

  // 获取聊天记录
  getChatRecord(chatRoomId: string) {
    const { chatRooms } = this.data;
    return chatRooms[chatRoomId].chatRecord;
  }
}
const u1 = {
  id: 'u1',
  name: 'user-1',
  chatRoomId: ['chatRoom-1'],
  clientId: undefined,
  password: '1234455',
};
const u2 = {
  id: 'u2',
  name: 'user-2',
  chatRoomId: ['chatRoom-1'],
  clientId: undefined,
  password: '1234455',
};
const u3 = {
  id: 'u3',
  name: 'user-3',
  chatRoomId: [],
  clientId: undefined,
  password: '1234455',
};
const store = DataStore.getInstance({
  users: { u1, u2, u3 },
  chatRooms: {
    'chatRoom-1': {
      id: 'chatRoom-1',
      name: '聊天室1',
      users: {
        u1,
        u2,
      },
      chatRecord: [],
      roomType: RoomType.Group,
    },
  },
});
