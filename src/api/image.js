import axios from '@/axios.js'
export function getImage(id, page = 1) {
  return axios.get(`/admin/image_class/${id}/image/${page}`)
}
