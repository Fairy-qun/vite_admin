<template>
  <el-main v-loading="loading">
    <div class="top">
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
    </div>
    <div class="buttom">
      <el-pagination background layout="prev, next" :total="total" :current-page="current_page" :page-size="limit" @current-change="getDataList" />
    </div>
  </el-main>
</template>

<script setup>
import { getImage } from '@/api/image.js'
import { ref } from 'vue'

const list = ref([])
const total = ref(0)
const current_page = ref(1)
const loading = ref(false)
const image_class_id = ref(0)

const getDataList = (p = null) => {
  if (typeof p == 'number') {
    current_page.value = p
  }
  loading.value = true
  getImage(image_class_id.value, current_page.value)
    .then(res => {
      list.value = res.list
      total.value = res.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}

const loadData = id => {
  current_page.value = 1
  image_class_id.value = id
  getDataList()
}

defineExpose({
  loadData
})
</script>

<style lang="scss" scoped>
.aside-main {
  display: flex;

  .el-main {
    flex: 1;
    position: relative;
    .top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 50px;
      overflow-y: auto;
    }
    .buttom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: pink;
      width: 100%;
      height: 50px;
    }
  }
}
</style>
