import { createRouter, createWebHistory } from 'vue-router'
import ChatRoomSyestemView from '@/views/ChatRoomSyestem.View.vue'
import LoginPageView from '@/views/LoginPage.view.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/chatRoom',
      name: 'ChatRoom',
      component: ChatRoomSyestemView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPageView
    }
  ]
})

export default router
