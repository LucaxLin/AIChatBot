<template>
  <!-- 组件模板渲染响应式变量 md2Html -->
  <div v-html="md2Html"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'; // 导入 ref 和 watchEffect
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
});

// 定义一个响应式变量来存储渲染后的HTML
const md2Html = ref<string>('');

// 定义渲染函数，该函数只负责转换，不负责赋值
const renderMarkdown = (markdown: string) => {
  const rawHtml = marked.parse(markdown) as string;
  return DOMPurify.sanitize(rawHtml);
};

// watchEffect 会追踪 props.content 的变化，并执行副作用
watchEffect(() => {
  if (props.content) {
    // 将渲染结果赋值给响应式变量 md2Html
    md2Html.value = renderMarkdown(props.content);
  } else {
    // 如果 content 为空，清空渲染结果
    md2Html.value = '';
  }
});

// 不再需要导出 renderMarkdown，因为它只在组件内部使用
</script>

<style scoped lang="scss">
/* 你的样式 */
</style>