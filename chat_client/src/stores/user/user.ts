import api from '@/server'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { IChatRoom, Imessage, UserT } from '../type'

const useUserStore = defineStore('userStore', () => {
  const user = ref<UserT>()
  const chatRooms = ref<IChatRoom[]>([])

  const currentChatRoom = ref<IChatRoom>()

  const login = async (params: Record<string, unknown>) => {
    const data = await api.postByJson<UserT>('/user', params)
    user.value = data
  }
  const setChatRooms = (params: IChatRoom[]) => {
    console.log(params)
    chatRooms.value = params
  }
  const setCurrnetChatRoom = (roomId: string) => {
    const room = chatRooms.value.find(({ id }) => id === roomId)
    currentChatRoom.value = room
  }
  const setChatRoomRecord = (roomId: string, record: Imessage[]) => {
    const room = chatRooms.value.find(({ id }) => id === roomId)
    if (room) {
      room.chatRecord = record
    }
  }

  return {
    user,
    chatRooms,
    currentChatRoom,
    login,
    setChatRooms,
    setCurrnetChatRoom,
    setChatRoomRecord
  }
})

export default useUserStore
