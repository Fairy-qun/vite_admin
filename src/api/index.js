import axios from '@/axios.js'

export function statistics1() {
  return axios.get('/admin/statistics1')
}
