<template>
  <div class="toggleDark">
    <div
      class="cursor-pointer i-carbon-sun dark:i-carbon-moon"
      @click="toggleDark()"
    />
  </div>
</template>
<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<style scoped lang="scss"></style>
