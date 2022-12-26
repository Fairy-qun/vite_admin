<template>
  <div>后台首页</div>
  <el-button type="primary" @click="handleLogout">退出</el-button>
</template>

<script setup>
import { logout } from '@/api/manager.js'
import store from '@/store/index.js'
import router from '@/router/index.js'
const handleLogout = () => {
  logout().then(res => {
    store.dispatch('logout')
    router.push('/login')
  })
}
</script>

<style lang="scss" scoped></style>
