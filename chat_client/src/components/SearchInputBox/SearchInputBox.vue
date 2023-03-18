<template>
  <div class="options-bar">
    <el-autocomplete
      v-model="searchVal"
      :fetch-suggestions="queryResults"
      clearable
      placeholder="Please Input"
    >
      <template #default="{ item }">
        <div class="item">
          {{ item.name }}
          <el-button
            type="primary"
            :disabled="item.joined"
            plain
            @click.stop="() => add(item)"
            size="small"
            >{{ item.joined ? '已加入' : '加入' }}</el-button
          >
        </div>
      </template>
    </el-autocomplete>
    <el-button
      style="padding: 7px; margin-left: 4px"
      @click="handleCreateChatRoom"
      type="primary"
      plain
      :icon="Plus"
    />
    <!-- <div class="plus-btn">
      <el-icon class=""><Plus /></el-icon>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import api from '@/server'
import useUserStore from '@/stores/user/user'

const userStore = useUserStore()

interface ListItem {
  roomId: string
  name: string
  joined: boolean
}

const searchVal = ref<string>('')
const queryResults = async (params: string) => {
  if (!params.trim().length) return []
  const res = await api.get<ListItem[]>('/user/chatRooms', {
    id: userStore.user?.id,
    roomName: params
  })
  return res
}

const add = (item: ListItem) => {
  console.log(item)
}

const handleCreateChatRoom = () => {
  ElMessageBox.prompt('输入聊天室名字', '创建聊天室', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /\S+/,
    inputErrorMessage: '非法输入'
  })
    .then(async ({ value }) => {
      value = value.trim()
      const res = await api.postByJson('/user/chatRoom', {
        uid: userStore.user?.id,
        name: value
      })
      return res
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled'
      })
    })
}
</script>

<style scoped lang="scss">
.options-bar {
  display: flex;
  align-items: center;

  .plus-btn {
    width: 32px;
    height: 32px;
    color: #333;
    line-height: 32px;
    margin-left: 4px;
    text-align: center;
    background-color: #ffffff;
    font-size: 14px;
    border-radius: 8px;
    box-shadow: 0 0 1px #ccc;
    cursor: pointer;

    &:hover {
      background-color: #79bbff;
      color: #fff;
    }
  }
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
