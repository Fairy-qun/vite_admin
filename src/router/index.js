import { createRouter, createWebHashHistory } from 'vue-router'

// 默认路由，所有用户共享
const routes = [
  {
    path: '/',
    name: 'admin',
    component: () => import('@/layout/Admin.vue'),
    meta: {
      title: '主控台'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  // 匹配所有的错误url
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '错误页面'
    }
  }
]
// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: () => import('@/views/goods/List.vue'),
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/category/list',
    name: '/category/list',
    component: () => import('@/views/category/List.vue'),
    meta: {
      title: '分类管理'
    }
  },
  {
    path: '/user/list',
    name: '/user/list',
    component: () => import('@/views/user/List.vue'),
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/order/list',
    name: '/order/list',
    component: () => import('@/views/order/List.vue'),
    meta: {
      title: '订单管理'
    }
  },
  {
    path: '/comment/list',
    name: '/comment/list',
    component: () => import('@/views/comment/List.vue'),
    meta: {
      title: '评价管理'
    }
  },
  {
    path: '/image/list',
    name: '/image/list',
    component: () => import('@/views/image/List.vue'),
    meta: {
      title: '图库管理'
    }
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    component: () => import('@/views/notice/List.vue'),
    meta: {
      title: '公告管理'
    }
  },
  {
    path: '/setting/base',
    name: '/setting/base',
    component: () => import('@/views/setting/Base.vue'),
    meta: {
      title: '配置管理'
    }
  },
  {
    path: '/coupon/list',
    name: '/coupon/list',
    component: () => import('@/views/coupon/List.vue'),
    meta: {
      title: '优惠券管理'
    }
  }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 动态添加路由的方法
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = arr => {
    arr.forEach(element => {
      let item = asyncRoutes.find(o => o.path == element.frontpath)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute('admin', item)
        hasNewRoutes = true
      }
      if (element.child && element.child.length > 0) {
        findAndAddRoutesByMenus(element.child)
      }
    })
  }
  findAndAddRoutesByMenus(menus)
  // console.log(router.getRoutes())
  return hasNewRoutes
}
