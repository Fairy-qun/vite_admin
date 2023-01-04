import axios from '@/axios.js'
export function getImageClassList(page) {
  return axios.get('/admin/image_class/' + page)
}

// 增加图库分类
export function addImageClass(data) {
  return axios.post('/admin/image_class', data)
}

// 修改图库分类
export function updateImageClass(id, data) {
  return axios.post('/admin/image_class/' + id, data)
}

// 删除图库分类
export function removeImageClass(id) {
  return axios.post('admin/image_class/' + id + '/delete')
}
