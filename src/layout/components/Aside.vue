<template>
  <div class="aside-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu :default-active="defaultActive" default-active="2" class="el-menu-vertical-demo" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false" :unique-opened="true">
      <template v-for="(item, index) in asideMenu" :key="index">
        <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(item2, index2) in item.child" ::key="index2" :index="item2.frontpath">
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()
const asideMenu = computed(() => store.state.menus)

// 绑定激活的index
const defaultActive = ref(route.path)

// 是否折叠
const isCollapse = computed(() => !(store.state.asideWidth == '250px'))
const handleSelect = e => {
  // e = e == '/' ? '/home' : e
  // console.log(e)
  router.push(e)
}
</script>

<style lang="scss" scoped>
.aside-menu {
  position: fixed;
  top: 64px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.2s;
  background-color: rgba(255, 255, 255, 0.807);
  box-shadow: 2px 0px 20px #ccc;
  .el-menu {
    border: none;
  }
}
</style>
