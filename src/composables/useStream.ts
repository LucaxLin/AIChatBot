export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StreamState {
  isLoading: boolean;
  isAborted: boolean;
  fullText: string;
  error: string | null;
}

// 定义流式响应的数据结构
interface StreamChunkChoice {
  index: number;
  delta: {
    content: string;
    reasoning_content: string | null;
    role: 'assistant' | string; // 角色可能还有其他值
  };
  finish_reason: string | null;
}

interface StreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: StreamChunkChoice[];
  system_fingerprint: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export function useStream() {
  const controller: Ref<AbortController | null> = ref(null);
  const state: Ref<StreamState> = ref({
    isLoading: false,
    isAborted: false,
    fullText: '',
    error: null,
  });

  /**
   * 启动流式请求
   * @param apiKey - 用户的API密钥
   * @param model - 要使用的模型名称
   * @param messages - 消息历史数组
   */
  const startStream = async (apiKey: string, model: string, messages: Message[]) => {
    // 如果已有请求在进行，先停止它
    if (controller.value) {
      stopStream();
    }

    // 重置状态
    state.value = {
      isLoading: true,
      isAborted: false,
      fullText: '',
      error: null,
    };

    // 创建新的控制器
    controller.value = new AbortController();
    const signal = controller.value.signal;

    const url = 'https://api.siliconflow.cn/v1/chat/completions';
    const requestBody = {
      model,
      messages,
      stream: true,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
        signal, // 关键：传入signal以使请求可被中止
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported or no body in response.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      while (!done && !signal.aborted) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (signal.aborted) {
          console.log("请求在读取过程中被中止。");
          break;
        }

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.substring(6);

              if (dataStr === '[DONE]') {
                console.log("流式响应自然结束");
                state.value.fullText = ''
                return;
              }

              try {
                // 解析为新的 StreamChunk 类型
                const dataObj: StreamChunk = JSON.parse(dataStr);
                
                // 从 choices 数组中提取内容
                const choice = dataObj.choices[0];
                if (choice) {
                  // 优先取 content，如果为空且存在 reasoning_content，则取 reasoning_content
                  // 根据你的日志，首次返回的 content 为空，reasoning_content 为 null
                  // 通常 content 是主要的回复内容，reasoning_content 可能用于推理过程
                  const contentToAppend = choice.delta.content;
                  if (contentToAppend) {
                    // 更新累积的完整文本
                    state.value.fullText += contentToAppend;
                  }
                }
              } catch (e) {
                console.warn("JSON解析失败:", e, "原始数据:", dataStr);
              }
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('请求成功被中止。');
        state.value.isAborted = true;
      } else {
        console.error('请求发生错误:', err);
        state.value.error = err.message || 'An unknown error occurred';
      }
    } finally {
      state.value.isLoading = false;
      controller.value = null;
    }
  };

  /**
   * 停止当前的流式请求
   */
  const stopStream = () => {
    if (controller.value) {
      console.log("正在中止请求...");
      controller.value.abort();
      // AbortError 会在 startStream 的 catch 块中被捕获并更新状态
    } else {
      console.log("没有进行中的请求可以中止。");
    }
  };

  /**
   * 清空当前的所有状态
   */
  const clear = () => {
    state.value = {
      isLoading: false,
      isAborted: false,
      fullText: '',
      error: null,
    };
  };

  return {
    state,
    startStream,
    stopStream,
    clear,
  };
}