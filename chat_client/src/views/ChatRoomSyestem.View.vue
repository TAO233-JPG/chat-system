<template>
  <div class="chatSystem">
    <div class="personal-center-pane">
      <PersonalCenter />
    </div>
    <div class="chat-room-list-pane">
      <ChatRoomList />
    </div>
    <div class="chat-interface-pane" @click="fn">
      <ChatInterface />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PersonalCenter from '@/components/PersonalCenter/PersonalCenter.vue'
import ChatRoomList from '@/components/ChatRoomList/ChatRoomList.vue'
import ChatInterface from '@/components/ChatInterface/ChatInterface.vue'
import { useRoute } from 'vue-router'
import io from 'socket.io-client'

const route = useRoute()
console.log(route.params)

let chat = io('http://localhost:3000', {
  path: '/chat',
  auth: {
    id: route.params.id
  }
})
chat.on('init', (...arg: any[]) => {
  console.log('init/收到消息', arg)
})
chat.on('sendMessage', (...arg: any[]) => {
  console.log('sendMessage/收到消息', arg)
})
chat.on('entryChatRoom', (...arg: any[]) => {
  console.log('entryChatRoom/获取消息', arg)
})

const fn = () => {
  console.log('aaa')

  chat.emit('sendMessage', {
    roomId: 'chatRoom-1',
    sender: { id: route.params.id, name: 'mkii', message: '123456' }
  })

  setTimeout(() => {
    chat.emit('entryChatRoom', { roomId: 'chatRoom-1' })
  }, 3000)
}
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
