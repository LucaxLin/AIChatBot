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
            'animate-slideInFromBottom': item.role === 'user',
            flex: item.role === 'user',
            'flex-justify-end': item.role === 'user'
          }
        ]"
        v-for="(item, index) in messageList"
      >
        <template v-if="item.role === 'assistant'">
          <mdMessage
            :key="`assistant-${index}`"
            :content="item.content"
          ></mdMessage>
        </template>
        <template v-else>
          <span>{{ item.content }}</span>
        </template>
      </div>
      <div ref="bottomSentinelRef"></div>
    </div>
    <div class="prompt" p8 b="1 solid rd-8 #ccc" flex="~ items-center gap8">
      <span i-iconoir-terminal flex-shrink-0 size-20></span>
      <el-input
        class="promptInput"
        v-model="prompt"
        placeholder="请输入..."
        @keydown="handleKeyDown"
      ></el-input>
      <div class="actions">
        <span
          v-if="!state.isLoading"
          i-iconoir-send-solid
          size-20
          cursor-pointer
          hover:text-primary
          transition-delay-100
          @click="handleSearch"
        ></span>
        <span
          v-else
          i-material-symbols-stop-circle
          size-20
          cursor-pointer
          hover:text-primary
          transition-delay-100
          @click="stopStream()"
        >
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStream, type Message } from '../composables/useStream'
import { useChatBotStore } from '../store/chatBotStore'

const messageList = ref<Message[]>([])
const prompt = ref('')
function handleKeyDown(e: KeyboardEvent | Event) {
  if (!(e instanceof KeyboardEvent)) {
    return
  } else if (e.key === 'Enter') {
    handleSearch()
  }
}
const apiKey = ref('')
const store = useChatBotStore()
const { currentChatBot } = storeToRefs(store)
const { state, startStream, stopStream, clear } = useStream()
async function handleSearch() {
  messageList.value.push({ role: 'user', content: prompt.value })
  prompt.value = ''
  const unwatch = watch(
    () => state.value.fullText,
    (newFullText) => {
      if (!newFullText) return
      // 检查 messageList 的最后一条消息是否是 assistant 的回复
      const lastMessage = messageList.value[messageList.value.length - 1]

      if (lastMessage && lastMessage.role === 'assistant') {
        // 如果是，则更新这条消息的内容
        lastMessage.content = newFullText
      } else {
        // 如果不是（例如，这是第一次回复），则添加一条新的 assistant 消息
        messageList.value.push({ role: 'assistant', content: newFullText })
      }
    },
    { immediate: true } // 立即以当前值触发一次回调
  )
  await startStream(apiKey.value, currentChatBot.value.value, messageList.value)
  unwatch()
  console.log(messageList.value.length)
}
const bottomSentinelRef = ref<HTMLDivElement>()
const scrollToBottom = () => {
  if (bottomSentinelRef.value) {
    bottomSentinelRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}
watch(
  messageList,
  () => {
    // 使用 nextTick 确保 DOM 已经更新
    nextTick(() => {
      scrollToBottom()
    })
  },
  { deep: true }
)
</script>
<style scoped lang="scss">
.chat {
  .dialog {
    .message {
      &.assistant {
      }
      &.user {
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
