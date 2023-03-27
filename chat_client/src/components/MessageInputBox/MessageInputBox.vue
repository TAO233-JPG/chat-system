<template>
  <el-input
    v-model="textarea"
    class="text"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 6 }"
    resize="none"
    placeholder="Please input"
    @keydown.enter.shift.prevent="send"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { chat } from '@/server/index'
import useUserStore from '@/stores/user/user'

const userStore = useUserStore()
const textarea = ref('')
interface Isender {
  id: string
  message: string
}
interface IsendMessage {
  roomId: string
  sender: Isender
}

const send = () => {
  const id = userStore.user?.id!
  const roomId = userStore.currentChatRoom?.id!
  const data = {
    roomId,
    sender: {
      id,
      message: textarea.value
    }
  }
  console.log(data)
  chat.emitEvent<IsendMessage>('sendMessage', data)
  textarea.value = ''
}
</script>
<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  color: #eee;
  background-color: #5951514d;
  box-shadow: 0 0 0 1px #4842424d inset;
  overflow: auto;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #c5c0c0;
  }
}
</style>
