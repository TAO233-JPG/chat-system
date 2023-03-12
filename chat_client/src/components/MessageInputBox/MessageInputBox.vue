<template>
  <el-input
    v-model="textarea"
    class="text"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 6 }"
    resize="none"
    placeholder="Please input"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const textarea = ref('')
</script>
<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  color: #eee;
  background-color: #5951514d;
  box-shadow: 0 0 0 1px #4842424d inset;
  overflow: auto;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #c5c0c0;
  }
}
</style>
