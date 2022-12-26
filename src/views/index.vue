<template>
  <div class="container">
    <el-row :gutter="20">
      <!-- 骨架屏 -->
      <template v-if="panels1.length == 0">
        <el-col :span="6" :offset="0" v-for="i in 4" :key="i">
          <el-skeleton animated loading>
            <template #template>
              <el-card class="box-card">
                <template #header>
                  <!-- 头 -->
                  <div class="card-header">
                    <el-skeleton-item variant="text" style="width: 60%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>
                <!-- body部分 -->
                <el-skeleton-item variant="text" style="width: 50%" />
                <el-divider />
                <div class="total_price">
                  <el-skeleton-item variant="text" style="width: 60%" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <!-- 面板1 -->
      <el-col :span="6" :offset="0" v-for="(item, index) in panels1" :key="index">
        <!-- 卡片 -->
        <el-card class="box-card">
          <template #header>
            <!-- 头 -->
            <div class="card-header">
              <span>{{ item.title }}</span>
              <el-tag :type="item.unitColor" class="mx-1" effect="dark">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <!-- body部分 -->
          <span class="price">
            <count-to :value="item.value"></count-to>
          </span>
          <el-divider />
          <div class="total_price">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import CountTo from '@/components/CountTo.vue'
import { statistics1 } from '@/api/index.js'
import { ref } from 'vue'
const panels1 = ref([])
statistics1().then(res => {
  panels1.value = res.panels
})
</script>

<style lang="scss" scoped>
.container {
  padding: 5px 20px 0px 5px;
  .card-header {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
  }
  .price {
    font-size: 40px;
    font-family: serif;
    color: rgba(0, 0, 0, 0.814);
  }
  .total_price {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
  }
}
</style>
