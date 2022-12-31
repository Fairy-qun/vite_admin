<template>
  <div class="container">
    <!-- 面板1 -->
    <index-card v-permission="['getStatistics1,GET']"></index-card>

    <!-- 面板2 -->
    <index-navs></index-navs>

    <!-- 面板3 -->
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="12" :offset="0">
        <index-chart v-permission="['getStatistics3,GET']"></index-chart>
      </el-col>
      <!-- 面板4 -->
      <el-col :span="12" :offset="0">
        <index-shops v-permission="['getStatistics2,GET']"></index-shops>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import IndexCard from '@/components/IndexCard.vue'
import IndexNavs from '@/components/IndexNavs.vue'
import IndexChart from '@/components/IndexChart.vue'
import IndexShops from '@/components/IndexShops.vue'
</script>

<style lang="scss">
.container {
  background-color: rgba(204, 204, 204, 0.364);
}
</style>
