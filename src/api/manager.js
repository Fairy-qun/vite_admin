import axios from '@/axios.js'
// 登录接口
export function login(username, password) {
  return axios.post('/admin/login', {
    username,
    password
  })
}

// 获取登录用户信息
export function getUserInfo() {
  return axios.post('/admin/getinfo')
}

// 退出登录
export function logout() {
  return axios.post('/admin/logout')
}
