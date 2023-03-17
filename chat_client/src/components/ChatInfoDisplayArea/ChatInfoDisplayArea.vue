<template>
  <div class="message-area">
    <ChatMessageItem v-for="record of chatRecord" :item="record" :key="record.id" />
  </div>
</template>
<script setup lang="ts">
import ChatMessageItem from '../ChatMessageItem/ChatMessageItem.vue'
import useUserStore from '@/stores/user/user'
import { computed } from 'vue'

const userStore = useUserStore()

const chatRecord = computed(() => {
  return userStore.currentChatRoom?.chatRecord ?? []
})
</script>
<style lang="scss" scoped>
.message-area {
  background-color: #0000002b;
}
</style>
