import axios from '@/axios.js'

// 获取数据
export function getSkusList(page) {
  return axios.get('/admin/skus/' + page)
}

// 增加
export function createSkus(data) {
  return axios.post('/admin/skus', data)
}

// 修改
export function updateSkus(id, data) {
  return axios.post('/admin/skus/' + id, data)
}

// 修改状态
export function updateSkusStatus(id, status) {
  return axios.post(`admin/skus/${id}/update_status`, { status })
}

// 批量删除
export function deleteSkus_all(ids) {
  return axios.post('/admin/skus/delete_all', { ids })
}
