<template>
  <div class="header">
    <!-- 左边 -->
    <div class="header-left">
      <span>
        <img src="@/assets/images/sun.svg" alt="" />
        <h3>Vite-Admin</h3>
      </span>
      <span>
        <el-icon :size="25" style="margin-right: 15px" @click="handleAsideWidth">
          <Fold v-if="$store.state.asideWidth == '250px'" />
          <Expand v-else />
        </el-icon>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
          <el-icon :size="25" @click="handerRefresh"><Refresh /></el-icon>
        </el-tooltip>
      </span>
    </div>
    <!-- 右边 -->
    <div class="header-right">
      <!-- 全屏 -->
      <el-tooltip effect="dark" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
        <el-icon :size="25" style="margin-right: 20px" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <!-- 头像 -->
      <el-avatar :size="50" :src="$store.state.user.avatar" style="margin-right: 10px" />
      <!-- {{ $store.state.user }} -->
      <!-- 下拉菜单 -->
      <el-dropdown @command="handerEvent">
        <span class="el-dropdown-link">
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
            <el-dropdown-item command="resetPassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <!-- 修改密码的抽屉 -->
  <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit" @cancelResetForm="cancelResetPassword">
    <el-form :model="form" label-width="80px" size="small" :rules="formRules" ref="formRef">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="form.oldpassword" placeholder="请输入原始密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="form.repassword" placeholder="请确认新密码"></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import { Refresh, Fold, FullScreen, Aim, ArrowDown, Expand } from '@element-plus/icons-vue'
import { useRepassword, useLogout } from '@/hooks/useManger.js'
import { useStore } from 'vuex'

// 全屏插件
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
const { formRef, formDrawerRef, form, formRules, onSubmit, openRepasswordForm, cancelResetPassword } = useRepassword()
const handerLogout = useLogout()
const store = useStore()
const handleAsideWidth = () => {
  store.commit('handleAsideWidth')
}

const handerEvent = e => {
  switch (e) {
    case 'logout':
      handerLogout()
      break
    case 'resetPassword':
      // console.log("修改密码");
      // drawer.value = true
      openRepasswordForm()
      break
    case 'userInfo':
      console.log('个人中心')
      break
  }
}

// 刷新功能
const handerRefresh = () => {
  location.reload()
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(103, 157, 236);
  width: 100%;
  height: 64px;
  color: #ccc;
  z-index: 999;
  .el-icon:hover {
    background-color: rgb(74, 134, 224);
  }

  .header-left {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 250px;
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 40px;
        height: 40px;
      }
      h3 {
        font-size: 20px;
        font-family: Sans-serif;
        color: rgb(146, 44, 219);
      }
    }
  }
  .header-right {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
