<template>
  <div class="chat-interface">
    <header class="chat-interface-header">
      <span></span>
      <span>聊天室</span>
      <span class="management">
        <el-icon size="18"><Management /></el-icon>
      </span>
    </header>
    <el-scrollbar>
      <div class="info-display"><ChatInfoDisplayArea /></div>
    </el-scrollbar>
    <MessageInputBox />
  </div>
</template>
<script setup lang="ts">
import MessageInputBox from '../MessageInputBox/MessageInputBox.vue'
import ChatInfoDisplayArea from '../ChatInfoDisplayArea/ChatInfoDisplayArea.vue'
import { Management } from '@element-plus/icons-vue'
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
