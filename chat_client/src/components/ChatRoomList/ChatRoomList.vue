<template>
  <div class="chat-room-list">
    <div class="input">
      <el-input v-model="input" size="default" placeholder="Please input" :suffix-icon="Search" />
    </div>

    <ul class="roomType" @click="($event) => changeType($event)">
      <li :class="{ checked: roomType === 'Recent' }" data-type="Recent">
        <el-icon><Notification /></el-icon>
      </li>
      <li :class="{ checked: roomType === 'Private' }" data-type="Private">
        <el-icon><User /></el-icon>
      </li>
      <li :class="{ checked: roomType === 'Group' }" data-type="Group">
        <el-icon><ChatDotRound /></el-icon>
      </li>
      <li class="fill-box"></li>
    </ul>
    <el-scrollbar>
      <div class="chat-rooms">
        <div class="rooms">
          <div v-for="room of list" :key="room.cId">
            <ListItem class="checked" />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Search, Notification, User, ChatDotRound } from '@element-plus/icons-vue'
import type { ChatRoomT, ChatRoomTypeT } from '@/stores/type'
import ListItem from '../ListItem/ListItem.vue'
const input = ref('')
const roomType = ref<ChatRoomTypeT>('Group')

function changeType(e: MouseEvent): void {
  let target = e.target as HTMLElement

  while (target.tagName !== 'LI' && target.parentNode) {
    target = target.parentNode as HTMLElement
  }
  if (target.className === 'full-box') return

  roomType.value = target.dataset.type as ChatRoomTypeT
}
const list: ChatRoomT[] = [
  {
    cId: '1',
    name: 'A',
    type: 'Group'
  },

  {
    cId: '12',
    name: 'A2',
    type: 'Group'
  },
  {
    cId: '12',
    name: 'A2',
    type: 'Group'
  },
  {
    cId: '12',
    name: 'A2',
    type: 'Group'
  },
  {
    cId: '12',
    name: 'A2',
    type: 'Group'
  },
  {
    cId: '12',
    name: 'A2',
    type: 'Group'
  },
  {
    cId: '12',
    name: 'A2',
    type: 'Group'
  },
  {
    cId: '12',
    name: 'A2',
    type: 'Group'
  },
  {
    cId: '12',
    name: 'A2',
    type: 'Group'
  },
  {
    cId: '123',
    name: 'A23',
    type: 'Group'
  }
]
</script>
<style lang="scss" scoped>
.chat-room-list {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  max-width: 200px;
  color: var(--vt-c-white-soft);
  box-shadow: 2px 0px 3px 0px #2d272737;
  .input {
    padding: 12px 8px;
    height: 56px;
  }
  .roomType {
    display: flex;
    height: 30px;
    width: auto;
    text-align: center;
    box-sizing: content-box;

    li {
      height: 30px;
      width: 40px;
      line-height: 30px;
      background-color: #ffffff41;
      cursor: pointer;
    }
    .checked {
      box-shadow: 2px 0px 3px 0px #2d272737;
      color: #5191fe;
      background-color: #00000000;
    }
    .fill-box {
      flex: 1;
      cursor: default;
    }
  }
  .chat-rooms {
    flex: 1;
    box-sizing: border-box;
    background-color: rgba($color: #2d2727, $alpha: 0.5);
  }
}

.checked {
  background-color: rgba($color: #1d1a1a, $alpha: 0.6);
}
</style>
