import { ElNotification, ElMessageBox, ElMessage} from 'element-plus'
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
export function Message(message,type = 'success') {
  return ElMessage({
    message,
    type,
    duration: 1500
  })
} 

// 确定消息弹窗
export function Confirm(content = "提示内容", type = 'warning') {
  return ElMessageBox.confirm(
    content,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type
    }
  )
}

// 全局进度条
export function showFullLoding() {
  NProgress.start()
}
export function hideFullLoding() {
  NProgress.done()
}