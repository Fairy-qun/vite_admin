<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <header-vue></header-vue>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :style="{ width: $store.state.asideWidth }">
          <aside-vue></aside-vue>
        </el-aside>
        <!-- 主体 -->
        <el-main>
          <!-- 菜单导航 -->
          <!-- 页面主体 -->
          <tab-list></tab-list>
          <div class="main-box" :style="{ left: $store.state.asideWidth }">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import HeaderVue from '@/layout/components/Header.vue'
import AsideVue from '@/layout/components/Aside.vue'
import TabList from '@/layout/components/TabList.vue'
</script>

<style lang="scss" scoped>
.el-aside {
  transition: all 0.2s;
}
.main-box {
  position: absolute;
  top: 110px;
  right: 0;
  margin-left: 10px;
}
</style>
