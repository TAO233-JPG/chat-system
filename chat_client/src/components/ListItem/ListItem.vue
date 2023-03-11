<template>
  <div class="list-item">
    <el-avatar :size="30" :src="url" />
    <div class="info-detial">
      <span class="name">WLL</span>
      <p class="message">hello world</p>
    </div>
    <div class="info-time">
      <p>昨天 12:22</p>
    </div>
  </div>
</template>
<script setup lang="ts">
const url = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
</script>
<style lang="scss" scoped>
.list-item {
  display: flex;
  box-sizing: content-box;
  height: 40px;
  font-size: 12px;
  align-items: center;
  padding: 10px 8px;

  .info-detial {
    display: inline-block;
    padding-left: 6px;
    padding-right: 4px;
    flex: 1;
    max-width: calc(100% - 65px - 30px);
    .message {
      font-size: 10px;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .info-time {
    display: inline-block;

    width: 65px;
    align-self: flex-end;
  }
}
</style>
