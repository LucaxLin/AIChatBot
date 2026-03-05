interface ChatBot {
  label: string
  value: string
  desc: string
}

export const useChatBotStore = defineStore('chatBotStore', () => {
  const currentChatBot = ref<ChatBot>({
    label: 'Qwen3-8B',
    value: 'Qwen/Qwen3-8B',
    desc: '适用于复杂逻辑推理、数学和编程和高效的通用对话'
  })
  const chatBotList = [
    {
      label: 'Qwen3-8B',
      value: 'Qwen/Qwen3-8B',
      desc: '适用于复杂逻辑推理、数学和编程和高效的通用对话'
    },
    {
      label: 'DeepSeek-R1',
      value: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
      desc: '基于 Qwen2.5-Math-7B 通过知识蒸馏得到的模型。展示了较强的数学和编程能力'
    }
  ]
  function setCurrentChatBot(chatBot: ChatBot) {
    currentChatBot.value = chatBot
  }
  return {
    currentChatBot,
    chatBotList,
    setCurrentChatBot
  }
})
