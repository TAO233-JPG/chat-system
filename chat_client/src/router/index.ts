import { createRouter, createWebHistory } from 'vue-router'
import ChatRoomSyestemView from '@/views/ChatRoomSyestem.View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChatRoomSyestemView
    }
  ]
})

export default router
