import router from '@/router/index.js'
import { Notice, showFullLoding, hideFullLoding } from '@/utils.js'
import store from '@/store/index.js'
// 前置守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  showFullLoding()
  const token = sessionStorage.getItem('admin-token')
  if (!token && to.path !== '/login') {
    router.push('/login')
  }

  // 避免重复登录
  if (token && to.path == '/login') {
    next({ path: from.path ? from.path : '/login' })
    Notice('请勿重复登录', 'warning')
  }
  if (token) {
    store.dispatch('getUserInfo')
  }
  next()
})

// 后置守卫
router.afterEach((to, from) => {
  // to and from are both route objects.
  hideFullLoding()
})
