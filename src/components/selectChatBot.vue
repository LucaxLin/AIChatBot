<template>
  <el-dropdown trigger="click" :show-arrow="false" @command="setCurrentChatBot">
    <el-button> 当前模型：{{ currentChatBot.label }} </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in chatBotList" :command="item">
          <div class="optionLayout w-[30vw]">
            <div class="title" text="size-16" font-bold>
              {{ item.label }}
            </div>
            <div class="desc" text="wrap size-12" mt6>
              {{ item.desc }}
            </div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { useChatBotStore } from '../store/chatBotStore'
const store = useChatBotStore()
const { currentChatBot } = storeToRefs(store)
const { chatBotList, setCurrentChatBot } = store
</script>
<style scoped lang="scss"></style>
