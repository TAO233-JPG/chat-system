<template>
  <div class="person-center">
    <div class="user">
      <el-avatar :size="40" :src="circleUrl" />
      <span class="name">{{ userStore.user?.name }}</span>
    </div>
    <ul class="person-options">
      <el-button type="danger" @click="handleLogout" :icon="SwitchButton" circle />
    </ul>
  </div>
</template>
<script setup lang="ts">
import Chat from '@/server/ws/chat'
import useUserStore from '@/stores/user/user'
import { SwitchButton } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const chat = Chat.getInstance()
const router = useRouter()
const userStore = useUserStore()
const handleLogout = () => {
  chat.close()
  router.replace('/')
}
</script>
<style lang="scss" scoped>
.person-center {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 60px;
  padding: 12px 8px;
  color: var(--vt-c-white-soft);
  background-color: rgba($color: #1d1a1a, $alpha: 0.6);

  .user {
    user-select: none;
    cursor: pointer;
    text-align: center;
    .name {
      margin-top: 6px;
      font-size: 14px;
    }
  }
}
</style>
