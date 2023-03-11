<template>
  <div class="person-center">
    <div class="user">
      <el-avatar :size="40" :src="circleUrl" />
      <span class="name">乌拉啦</span>
    </div>
    <ul class="person-options">
      <li>3</li>
      <li>3</li>
      <li>3</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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
  padding: 20px 8px;
  color: var(--vt-c-white-soft);
  background-color: rgba($color: #1d1a1a, $alpha: 0.6);

  .user {
    user-select: none;
    cursor: pointer;
    .name {
      margin-top: 6px;
      font-size: 14px;
    }
  }
}
</style>
