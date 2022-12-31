<template>
  <div class="container">
    <el-container class="main-box" :style="{ height: h + 'px' }">
      <el-header>
        <el-button type="primary" size="small" @click="handleOpen">新增图片分类</el-button>
        <el-button type="warning" size="small">上传图片</el-button>
      </el-header>
      <el-container class="aside-main">
        <ImageAside ref="ImageAsideRef"></ImageAside>
        <ImageMain></ImageMain>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'
const windowHeight = window.innerHeight || document.documentElement.clientHeight
const h = windowHeight - 64 - 40 - 28

const ImageAsideRef = ref(null)
const handleOpen = () => {
  ImageAsideRef.value.handleCreate()
}
</script>

<style lang="scss" scoped>
.container {
  .main-box {
    margin: 10px 20px 10px;
    border-radius: 10px;
    background-color: #eee;
    .el-header {
      display: flex;
      align-items: center;
      width: 100%;
      height: 64px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
