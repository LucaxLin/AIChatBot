<template>
  <div class="chat" hfull p16 flex="~ gap8 col">
    <div
      class="dialog"
      h0
      p16
      flex-1
      overflow-auto
      b="1 solid rd-8 #ccc"
      flex="~ col gap16"
    >
      <div
        class="message"
        :class="[
          item.role,
          {
            'animate-fadeIn': item.role === 'assistant',
            'animate-slideInFromBottom': item.role === 'user'
          }
        ]"
        v-for="item in messageList"
      >
        <span>{{ item.content }}</span>
      </div>
    </div>
    <div class="prompt" p8 b="1 solid rd-8 #ccc" flex="~ items-center gap8">
      <span i-iconoir-terminal flex-shrink-0 size-20></span>
      <el-input
        class="promptInput"
        v-model="prompt"
        placeholder="请输入..."
        @keydown="handleKeyDown"
      ></el-input>
      <span
        i-iconoir-send-solid
        size-20
        cursor-pointer
        hover:text-primary
        transition-delay-100
        @click="handleSearch"
      ></span>
    </div>
  </div>
</template>
<script setup>
const messageList = ref([
  { role: 'user', content: '你好！...' },
  { role: 'assistant', content: '我是一个有用的助手' }
])
const prompt = ref('')
function handleKeyDown({ key }) {
  if (key === 'Enter') {
    handleSearch()
  }
}
function handleSearch() {
  messageList.value.push({ role: 'user', content: prompt.value })
  prompt.value = ''
}
</script>
<style scoped lang="scss">
.chat {
  .dialog {
    .message {
      &.assistant {
      }
      &.user {
        text-align: right;
        span {
          display: inline-block;
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 8px 8px 0 8px;
        }
      }
    }
  }
  :deep(.promptInput) {
    .el-input__wrapper {
      box-shadow: none;
      background-color: inherit;
      padding: 0;
    }
  }
}
</style>
