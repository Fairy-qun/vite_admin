<template>
  <div>
    <!-- 卡片1 -->
    <el-card shadow="never">
      <template #header>
        <div class="title">
          <span>店铺及商品提示</span>
          <el-tag class="ml-2" type="warning">店铺及商品提示</el-tag>
        </div>
      </template>
      <!-- card body -->
      <el-row :gutter="20">
        <el-col :span="6" :offset="0" v-for="(item, index) in goods" :key="index">
          <el-card shadow="hover">
            <div class="body">
              <span>{{ item.value }}</span>
              <span>{{ item.label }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <!-- 卡片2 -->
    <el-card shadow="never" style="margin-top: 10px">
      <template #header>
        <div class="title">
          <span>交易提醒</span>
          <el-tag class="ml-2" type="warning">需要立即处理的交易订单</el-tag>
        </div>
      </template>
      <!-- card body -->
      <el-row :gutter="20">
        <el-col :span="6" :offset="0" v-for="(item, index) in order" :key="index">
          <el-card shadow="hover">
            <div class="body">
              <span>{{ item.value }}</span>
              <span>{{ item.label }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { statistics2 } from '@/api/index.js'
import { onMounted } from 'vue'
import { ref } from 'vue'

const goods = ref([])
const order = ref([])

onMounted(() => {
  getDataList()
})

// 获取数据
const getDataList = () => {
  statistics2().then(res => {
    goods.value = res.goods
    order.value = res.order
  })
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
