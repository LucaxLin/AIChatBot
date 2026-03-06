<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
  >
    <span>请输入API key</span>
    <el-input v-model="apiKey"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="setToken">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
const dialogVisible = ref(false)
const apiKey = ref('')
function setToken() {
  dialogVisible.value = false
  emits('setToken', apiKey.value)
}
function toggleDialog(flag) {
  dialogVisible.value = flag
}
const emits = defineEmits(['setToken'])
defineExpose({
  toggleDialog
})
</script>
<style scoped lang="scss"></style>
