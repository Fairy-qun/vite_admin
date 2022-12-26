import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'

export function useTabList() {
  const route = useRoute()
  const router = useRouter()
  const activeTab = ref(route.path)
  const tabLists = ref([
    {
      title: '后台首页',
      path: '/'
    }
  ])

  // 添加tab栏函数
  const addTabs = tab => {
    let noTabs = tabLists.value.findIndex(t => t.path == tab.path) == -1
    if (noTabs) {
      tabLists.value.push(tab)
    }
    sessionStorage.setItem('tablist', JSON.stringify(tabLists.value))
  }

  // 初始化tab栏
  const initTabList = () => {
    const tbs = JSON.parse(sessionStorage.getItem('tablist'))
    if (tbs) {
      tabLists.value = tbs
    }
  }
  initTabList()

  // 监听路由更新状态
  onBeforeRouteUpdate((to, from) => {
    activeTab.value = to.path
    const data = {
      title: to.meta.title,
      path: to.path
    }
    addTabs(data)
  })

  const changeTab = t => {
    activeTab.value = t
    router.push(t)
  }

  const removeTab = t => {
    let tabs = tabLists.value
    let active = activeTab.value
    if (t == active) {
      tabs.forEach((item, index) => {
        if (item.path == t) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            active = nextTab.path
          }
        }
      })
    }
    activeTab.value = active
    tabLists.value = tabLists.value.filter(tab => tab.path != t)
    sessionStorage.setItem('tablist', JSON.stringify(tabLists.value))
  }

  // 关闭其它或者全部关闭处理事件
  const handleEvent = e => {
    if (e == 'closeTotal') {
      activeTab.value = '/'
      tabLists.value = [
        {
          title: '后台首页',
          path: '/'
        }
      ]
    } else if (e == 'closeOther') {
      tabLists.value = tabLists.value.filter(tab => tab.path == '/' || tab.path == activeTab.value)
    }
    sessionStorage.setItem('tablist', JSON.stringify(tabLists.value))
  }

  return {
    activeTab,
    tabLists,
    changeTab,
    removeTab,
    handleEvent
  }
}
