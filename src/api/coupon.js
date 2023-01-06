import axios from '@/axios.js'

// 获取数据
export function getCouponList(page) {
  return axios.get('/admin/coupon/' + page)
}

// 增
export function createCoupon(data) {
  return axios.post('/admin/coupon', data)
}

// 改
export function updateCoupon(id, data) {
  return axios.post('/admin/coupon/' + id, data)
}

// 删
export function deleteCoupon(id) {
  return axios.post(`/admin/coupon/${id}/delete`)
}

// 失效
export function disactiveCoupon(id) {
  return axios.post(`/admin/coupon/${id}/update_status`, { status: 0 })
}
