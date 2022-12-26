import axios from 'axios'
import store from '@/store/index.js'
import { router } from '@/router/index.js'
import { Notice } from '@/utils.js'
const service = axios.create({
  baseURL: '/api'
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 自动添加token
    const token = sessionStorage.getItem('admin-token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  function (response) {
    return response.data.data
  },
  function (error) {
    const msg = error.response.data.msg
    Notice(msg, 'error')
    if (msg === '非法token，请先登录！') {
      store.dispatch('logout').finally(() => location.reload())
      router.push('/login')
    }
    // return Promise.reject(error)
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
)

export default service
