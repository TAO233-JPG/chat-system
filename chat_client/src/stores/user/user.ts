import api from '@/server'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { UserT } from '../type'
const useUserStore = defineStore('user', () => {
  const user = ref<UserT>()

  const login = async (params: Record<string, unknown>) => {
    const data = await api.postByJson<UserT>('/user', params)
    user.value = data
  }

  return {
    user,
    login
  }
})

export default useUserStore
