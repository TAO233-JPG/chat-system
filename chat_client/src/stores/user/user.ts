import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { UserT } from '../type'
const useUserStore = defineStore('user', () => {
  const user = ref<UserT>()
  const a = 'AA'

  return {
    user,
    a
  }
})

export default useUserStore
