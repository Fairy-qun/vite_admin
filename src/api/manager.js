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

// 修改密码
export function updatePassword(data) {
  return axios.post('/admin/updatepassword', data)
}

// 获取管理员列表
export function getManagerList(page = 1, query = {}) {
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join('&')
  r = r ? '?' + r : ''
  return axios.get(`/admin/manager/${page}${r}`)
}

// 修改管理员状态
export function updateManagerStatus(id, status) {
  return axios.post(`/admin/manager/${id}/update_status`, {
    status
  })
}

// 删除管理员
export function removeManager(id) {
  return axios.post(`/admin/manager/${id}/delete`)
}
// 修改管理员
export function updateManager(id, data) {
  return axios.post(`manager/${id}`, data)
}
// 增加管理员
export function createManager(data) {
  return axios.post('/admin/manager', data)
}
