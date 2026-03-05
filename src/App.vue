<script setup lang="ts"></script>

<template>
  <div hfull flex="~ col justify-center items-center">
    <div class="top" wfull p16 flex="~  justify-between items-center">
      <div class="title" font-bold flex-1>AI Chat</div>
      <div class="nav" flex="~ [10] justify-center gap32 items-center">
        <selectChatBot></selectChatBot>
      </div>
      <div class="right" flex="~ 1 justify-end">
        <toggleDark></toggleDark>
      </div>
    </div>
    <div style="flex-grow: 1; width: 100%; overflow: auto">
      <RouterView class="animate-fadeIn" hfull />
    </div>
  </div>
</template>

<style scoped></style>
