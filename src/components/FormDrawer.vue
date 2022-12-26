<template>
 <div>
  <el-drawer
    v-model="drawer"
    :title="title"
    :close-on-click-modal="false"
    :size="size"
    :destroy-on-close="destroyOnClose"
  >
  <div class="formDrawer">
    <div class="content">
      <slot></slot>
    </div>
    <div class="action">
      <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
      <el-button type="info" @click="cancelResetForm">取消</el-button>
    </div>
  </div>
  </el-drawer>
 </div>
</template>

<script setup>
import {ref} from 'vue'
const drawer = ref(false)
const loading = ref(false)

// 抽屉的开启与关闭两个方法
const open = () => drawer.value = true
const close = () => drawer.value = false

// 显示与关闭loading效果
const showLoading = () => loading.value = true
const closeLoading = () => loading.value = false

// 分享属性
const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "45%"
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: "提交"
  },
  loading: {
    type: Boolean,
    default: true
  }
})


// 提交
const emit = defineEmits(["submit","cancelResetForm"]) 
const submit = () => emit("submit")
const cancelResetForm = () => emit("cancelResetForm")

// 向父组件暴露以下方法
defineExpose({
  open,
  close,
  showLoading,
  closeLoading
})
</script>

<style lang='scss' scoped>
.formDrawer {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .content {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }
  .action {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
  }
}
</style>