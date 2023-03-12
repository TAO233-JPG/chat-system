<template>
  <div class="message">
    <div class="message-detail">
      <el-avatar :size="25" :src="url" />
      <div class="name">
        Nameddawdw
        <span class="date">info-time</span>
      </div>
    </div>

    <div class="message-content">消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容</div>
  </div>
  <div class="message right-message">
    <div class="message-detail">
      <el-avatar :size="25" :src="url" />
      <div class="name">
        Nameddawdw
        <span class="date">info-time</span>
      </div>
    </div>

    <div class="message-content">消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容</div>
  </div>

  <div class="message">
    <div class="message-detail">
      <el-avatar :size="25" :src="url" />
      <div class="name">
        Nameddawdw
        <span class="date">info-time</span>
      </div>
    </div>

    <div class="message-content">消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容</div>
  </div>
  <div class="message">
    <div class="message-detail">
      <el-avatar :size="25" :src="url" />
      <div class="name">
        Nameddawdw
        <span class="date">info-time</span>
      </div>
    </div>

    <div class="message-content">消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容</div>
  </div>
</template>
<script setup lang="ts">
const url = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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
