import axios from '@/axios.js'

// 获取
export function getRuleList(page = 1) {
  return axios.get('/admin/rule/' + page)
}

// 新增
export function createRule(data) {
  return axios.post('/admin/rule', data)
}

// 修改
export function updateRule(id, data) {
  return axios.post('/admin/rule/' + id, data)
}

// 删除
export function deleteRule(id) {
  return axios.post(`/admin/rule/${id}/delete`)
}

// 修改菜单权限状态
export function updateStatus(id, status) {
  return axios.post(`/admin/rule/${id}/update_status`, { status })
}
