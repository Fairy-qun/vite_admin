import axios from '@/axios.js'

// 获取数据
export function getRoleList(page = 1) {
  return axios.get('/admin/role/' + page)
}

// 增
export function createRole(data) {
  return axios.post('/admin/role', data)
}

// 改
export function updateRole(id, data) {
  return axios.post('/admin/role/' + id, data)
}

// 删
export function deleteRole(id) {
  return axios.post(`/admin/role/${id}/delete`)
}

// 修改状态
export function updateRoleStatus(id, status) {
  return axios.post(`/admin/role/${id}/update_status`, { status })
}

// 配置角色权限
export function settingRole(id, rule_ids) {
  return axios.post('/admin/role/set_rules', {
    id,
    rule_ids
  })
}
