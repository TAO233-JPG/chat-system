import DataStore from './store';
import { RoomType } from './type';

const u1 = {
  id: 'u1',
  name: 'user-1',
  chatRoomId: ['chatRoom-1', 'chatRoom-3'],
  clientId: undefined,
  password: '123',
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
      chatRecord: [
        {
          id: '20a88204-103e-4b84-b6c4-ef1668889219',
          senderId: 'u2',
          senderName: 'user-2',
          content: '1122\n',
          date: '2023-03-18T04:53:19.583Z',
        },
        {
          id: 'd2e8f249-c57e-46c1-ad5b-b03c9a20d2d9',
          senderId: 'u2',
          senderName: 'user-2',
          content: '1122\n\n大王的',
          date: '2023-03-18T04:53:22.625Z',
        },
        {
          id: 'aa5403ee-909a-4d9e-955c-207e7993a2ea',
          senderId: 'u2',
          senderName: 'user-2',
          content: '1122\n\n大王的\n你好好',
          date: '2023-03-18T04:53:25.858Z',
        },
      ],
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
