<template>
  <div
    class="tab-list"
    :style="{
      left: $store.state.asideWidth
    }"
  >
    <!-- tab栏 -->
    <el-tabs v-model="activeTab" type="card" class="demo-tabs" @tab-remove="removeTab" @tab-change="changeTab" style="min-width: 100px">
      <el-tab-pane :closable="item.path != '/'" v-for="item in tabLists" :key="item.path" :label="item.title" :name="item.path"> </el-tab-pane>
    </el-tabs>
    <!-- 下拉菜单 -->
    <span class="dropdown">
      <el-dropdown @command="handleEvent">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOther">关闭其它</el-dropdown-item>
            <el-dropdown-item command="closeTotal">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>

<script setup>
import { useTabList } from '@/hooks/useTabList.js'
const { activeTab, tabLists, changeTab, removeTab, handleEvent } = useTabList()
</script>
<style lang="scss" scoped>
.tab-list {
  position: fixed;
  top: 64px;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: rgba(204, 204, 204, 0.251);
  .dropdown {
    margin: 0 20px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #fff;
  }
}
:deep(.el-tabs__header) {
  margin-bottom: 0;
  display: flex;
  align-items: center;
  // margin-left: 10px;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.el-tabs__item) {
  margin: 0 5px;
  border-radius: 5px;
  border: none !important;
  height: 32px;
  background-color: #fff;
}
:deep(.is-disabled) {
  cursor: not-allowed;
}
</style>
