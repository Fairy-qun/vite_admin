import { Confirm, Message, Notice } from '@/utils.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { updatePassword, logout } from '@/api/manager.js'
import { ref, reactive } from 'vue'
// 修改密码
export function useRepassword() {
  const store = useStore()
  const router = useRouter()
  // 修改密码的抽屉框变量
  const formRef = ref(null)
  const formDrawerRef = ref(null)
  const form = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
  })
  // 表单验证规则
  const formRules = reactive({
    oldpassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入新密码', trigger: 'blur' },
      { require: true, min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    repassword: [
      { required: true, message: '请确认密码', trigger: 'blur' },
      { require: true, min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ]
  })

  // 提交按钮事件
  const onSubmit = () => {
    if (!formRef) return
    formRef.value.validate(valid => {
      if (!valid) {
        return false
      }
      // 验证成功之后的业务逻辑
      formDrawerRef.value.showLoading()
      updatePassword(form)
        .then(res => {
          // 修改成功的业务逻辑
          Notice('修改密码成功,请重新登录!')
          store.dispatch('logout')
          router.push('/login')
        })
        .finally(() => {
          formDrawerRef.value.closeLoading()
        })
    })
  }

  const openRepasswordForm = () => formDrawerRef.value.open()

  // 取消按钮事件
  const cancelResetPassword = () => {
    // drawer.value = false
    formDrawerRef.value.close()
    Notice('您取消了密码修改', 'info')
    if (!formRef) return
    formRef.value.resetFields()
  }

  return {
    formRef,
    formDrawerRef,
    form,
    formRules,
    onSubmit,
    openRepasswordForm,
    cancelResetPassword
  }
}

// 退出登录
export function useLogout() {
  const router = useRouter()
  const store = useStore()
  const handerLogout = () => {
    Confirm('确定退出登录?')
      .then(res => {
        // console.log(111);
        // 退出登录发业务逻辑
        logout()
          .then(res => {
            // 成功逻辑
            store.dispatch('logout')
            router.push('/login')
            Message('退出登录成功')
          })
          .catch(err => {
            // 失败逻辑
            reject(err)
          })
      })
      .catch(err => {
        Message('取消退出登录操作', 'info')
      })
  }
  return handerLogout
}
