<template>
  <div class="main">
    <!-- 表单 -->
    <div class="main-box">
      <h1>欢迎回来</h1>
      <div class="form">
        <el-form :model="form" :rules="formRules" ref="formRef">
          <el-form-item class="name" prop="username">
            <el-input placeholder="请输入用户名" :prefix-icon="User" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入用户密码" :prefix-icon="Lock" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" style="width: 100%" @click="onSubmit" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Lock, User } from '@element-plus/icons-vue'
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { Notice } from '@/utils.js'
import store from '@/store/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})
const formRules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '用户密码不能为空', trigger: 'blur' }]
})
const formRef = ref(null)
const loading = ref(false)
const onSubmit = () => {
  if (!formRef) return
  formRef.value.validate(valid => {
    if (!valid) {
      return false
    }
    loading.value = true
    store
      .dispatch('login', form)
      .then(res => {
        Notice('登录成功')
        router.push('/')
      })
      .catch(err => Promise.reject(err))
      .finally(() => {
        loading.value = false
      })
  })
}

const onKeyUp = e => {
  if (e.key == 'Enter') onSubmit()
}

onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('@/assets/images/login_background.jpg');
  background-size: 100% 100%;
  background-position: center center;
  .main-box {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 3%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 350px;
    h1 {
      color: #fff;
      font-size: 50px;
    }
    .form {
      padding: 10px;
      width: 100%;
      height: 250px;
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: 0px 1px 20px #ccc;
      .el-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
