<template>
  <div>
    <el-result icon="warning" title="错误页面">
      <template #sub-title>
        <p>当前页面已丢失~</p>
      </template>
      <template #extra>
        <el-button type="primary" @click="$router.back">返回上一页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
