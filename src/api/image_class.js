import axios from '@/axios.js'
export function getImageClassList(page) {
  return axios.get('/admin/image_class/' + page)
}

// 增加图库分类
export function addImageClass(data) {
  return axios.post('/admin/image_class', data)
}
