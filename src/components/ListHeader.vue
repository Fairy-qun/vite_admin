<template>
  <div class="main">
    <el-button type="primary" size="small" @click="$emit('create')">新增</el-button>
    <el-tooltip content="刷新数据" placement="top" effect="dark">
      <el-button text size="small" @click="$emit('refresh')">
        <el-icon :size="20"> <Refresh /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup>
defineEmits(['create', 'refresh'])
</script>
<style lang="scss">
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}
</style>
