import DataStore from './store';
import { RoomType } from './type';

const u1 = {
  id: 'u1',
  name: 'user-1',
  chatRoomId: ['chatRoom-1', 'chatRoom-3'],
  clientId: undefined,
  password: '1234455',
};
const u2 = {
  id: 'u2',
  name: 'user-2',
  chatRoomId: ['chatRoom-1', 'chatRoom-3'],
  clientId: undefined,
  password: '123',
};
const u3 = {
  id: 'u3',
  name: 'user-3',
  chatRoomId: [],
  clientId: undefined,
  password: '123',
};
export const store = DataStore.getInstance({
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
    'chatRoom-2': {
      id: 'chatRoom-2',
      name: '聊天室2',
      users: {
        u1,
        u3,
      },
      chatRecord: [],
      roomType: RoomType.Group,
    },
    'chatRoom-3': {
      id: 'chatRoom-3',
      name: '聊天室3',
      users: {
        u1,
        u2,
        u3,
      },
      chatRecord: [],
      roomType: RoomType.Group,
    },
  },
});
