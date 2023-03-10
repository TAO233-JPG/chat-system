<template>
  <div class="chatSystem">
    <div class="personal-center">
      个人界面

      <div>{{ userStore.a }}</div>
    </div>
    <div class="chat-room-list">聊天室列表</div>
    <div class="chat-interface">聊天界面</div>
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/stores/user/user'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.chatSystem {
  position: absolute;
  display: flex;
  width: 1024px;
  height: 500px;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  background-color: rgba($color: #1d1a1a, $alpha: 0.5);
  backdrop-filter: blur(6px);

  .personal-center {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 200px;
  }
  .chat-room-list {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 300px;
  }
  .chat-interface {
    flex: 1;
  }
}
</style>
