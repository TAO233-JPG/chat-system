<template>
  <div class="chat-interface">
    <header class="chat-interface-header">
      <span></span>
      <span>{{ title }}</span>
      <span class="management">
        <el-icon size="18"><Management /></el-icon>
      </span>
    </header>
    <el-scrollbar ref="scrollbar">
      <div class="info-display"><ChatInfoDisplayArea /></div>
    </el-scrollbar>
    <MessageInputBox />
  </div>
</template>
<script setup lang="ts">
import MessageInputBox from '../MessageInputBox/MessageInputBox.vue'
import ChatInfoDisplayArea from '../ChatInfoDisplayArea/ChatInfoDisplayArea.vue'
import { Management } from '@element-plus/icons-vue'
import useUserStore from '@/stores/user/user'
import { computed, nextTick, ref, watch } from 'vue'
const userStore = useUserStore()
const scrollbar = ref<any>(null)
const title = computed(() => {
  return userStore.currentChatRoom?.name ?? '请打开一个聊天室'
})

watch(
  () => userStore.currentChatRoom?.chatRecord,
  () => {
    if (scrollbar.value) {
      nextTick(() => {
        const scroll = (scrollbar.value.wrapRef as HTMLElement).children[0]
        scrollbar.value.scrollTo(0, scroll.scrollHeight)
      })
    }
  }
)
</script>
<style lang="scss" scoped>
.chat-interface {
  display: flex;
  height: 100%;
  flex-direction: column;
  color: var(--vt-c-white-soft);
  .chat-interface-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #5b595924;

    .management {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: #5191fe;
      }
    }
  }

  .info-display {
    flex: 1;
  }
}
</style>
