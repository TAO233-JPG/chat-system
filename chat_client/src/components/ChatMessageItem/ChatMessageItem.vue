<template>
  <div :class="{ 'right-message': item.senderId == id, message: true }">
    <div class="message-detail">
      <el-avatar :size="25" :src="url" />
      <div class="name">
        {{ item.senderName }}
        <span class="date">{{ item.date }}</span>
      </div>
    </div>

    <div class="message-content">
      {{ item.content }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Imessage } from '@/stores/type'
import useUserStore from '@/stores/user/user'

const url = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
defineProps<{ item: Imessage }>()
const userStore = useUserStore()
const id = userStore.user?.id
</script>
<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 14px;
  color: var(--vt-c-white-soft);

  .message-detail {
    display: flex;
    align-items: center;

    .name {
      font-size: 14px;
      padding: 0 4px;
      .date {
        font-size: 12px;
      }
    }
  }

  .message-content {
    display: inline-block;
    width: auto;
    max-width: 60%;
    margin-top: 8px;
    margin-left: 6px;
    padding: 8px 12px;
    background-color: #ece4e424;
    border-radius: 10px;
  }
}

.right-message {
  align-items: flex-end;
}
</style>
