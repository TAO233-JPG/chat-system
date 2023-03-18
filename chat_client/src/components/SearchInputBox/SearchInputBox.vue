<template>
  <el-autocomplete
    v-model="searchVal"
    :fetch-suggestions="queryResults"
    clearable
    placeholder="Please Input"
    ><template #default="{ item }">
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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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
</script>

<style scoped lang="scss">
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
