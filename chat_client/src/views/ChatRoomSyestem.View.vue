<template>
  <div class="chatSystem">
    <div class="personal-center-pane">
      <PersonalCenter />
    </div>
    <div class="chat-room-list-pane">
      <ChatRoomList />
    </div>
    <div class="chat-interface-pane">
      <ChatInterface />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PersonalCenter from '@/components/PersonalCenter/PersonalCenter.vue'
import ChatRoomList from '@/components/ChatRoomList/ChatRoomList.vue'
import ChatInterface from '@/components/ChatInterface/ChatInterface.vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user/user'
import Chat from '@/server/ws/chat'
import type { IinitData, Imessage, IgetRecordData } from '@/stores/type'
const userStore = useUserStore()
const router = useRouter()
const id = userStore.user?.id!
const chat = Chat.getInstance(id)
chat.connect()

chat.listenEvent<IinitData>('init', (data) => {
  if (data?.status === 'fail') {
    chat.close()
    router.replace('/')
    return
  }
  console.log(data, 'init')
  userStore.setChatRooms(data.data.chatRooms)
})
chat.listenEvent<IgetRecordData>('getRecord', (data) => {
  const { record, roomId } = data.data
  console.log('getRe', record)

  userStore.setChatRoomRecord(roomId, record)
})
chat.listenEvent<IgetRecordData>('sendMessage', (data) => {
  // const { record, roomId } = data.data
  // userStore.setChatRoomRecord(roomId, record)
  console.log(data, 'sendMessage')
  chat.emitEvent('getRecord', { roomId: userStore.currentChatRoom?.id })
})
</script>

<style lang="scss" scoped>
.chatSystem {
  position: absolute;
  display: flex;
  width: 860px;
  height: 600px;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  background-color: rgba($color: #1d1a1a, $alpha: 0.5);
  backdrop-filter: blur(6px);

  .personal-center-pane {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .chat-room-list-pane {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 200px;
  }
  .chat-interface-pane {
    flex: 1;
  }
}
</style>
