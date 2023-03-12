<template>
  <div class="chatSystem">
    <div class="personal-center-pane">
      <PersonalCenter />
    </div>
    <div class="chat-room-list-pane">
      <ChatRoomList />
    </div>
    <div class="chat-interface-pane">
      <ChatInterface />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PersonalCenter from '@/components/PersonalCenter/PersonalCenter.vue'
import ChatRoomList from '@/components/ChatRoomList/ChatRoomList.vue'
import ChatInterface from '@/components/ChatInterface/ChatInterface.vue'
</script>

<style lang="scss" scoped>
.chatSystem {
  position: absolute;
  display: flex;
  width: 860px;
  height: 500px;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  background-color: rgba($color: #1d1a1a, $alpha: 0.5);
  backdrop-filter: blur(6px);

  .personal-center-pane {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .chat-room-list-pane {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 200px;
  }
  .chat-interface-pane {
    flex: 1;
  }
}
</style>
