import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import NProgress from 'nprogress'

// 消息通知
export function Notice(message, type = 'success') {
  ElNotification({
    message,
    type,
    duration: 1500
  })
}

//消息提示
export function Message(message, type = 'success') {
  return ElMessage({
    message,
    type,
    duration: 1500
  })
}

// 确定消息弹窗
export function Confirm(content = '提示内容', type = 'warning') {
  return ElMessageBox.confirm(content, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
}

// 全局进度条
export function showFullLoding() {
  NProgress.start()
}
export function hideFullLoding() {
  NProgress.done()
}

// 参数转换
export function queryParams(query) {
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join('&')
  r = r ? '?' + r : ''
  return r
}

// 上移
export function useArrayMoveUp(arr, index) {
  swapArray(arr, index, index - 1)
}

// 下移
export function useArrayMoveDown(arr, index) {
  swapArray(arr, index, index + 1)
}

function swapArray(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

// sku排列算法
export function cartesianProductOf() {
  return Array.prototype.reduce.call(
    arguments,
    function (a, b) {
      var ret = []
      a.forEach(function (a) {
        b.forEach(function (b) {
          ret.push(a.concat([b]))
        })
      })
      return ret
    },
    [[]]
  )
}
