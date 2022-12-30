import axios from '@/axios.js'

export function statistics1() {
  return axios.get('/admin/statistics1')
}

// 统计3
export function statistics3(type) {
  return axios.get('/admin/statistics3?type=' + type)
}

// 统计2
export function statistics2() {
  return axios.get('/admin/statistics2')
}
