import { createStore } from 'vuex'
import { login, getUserInfo } from '@/api/manager.js'

const store = createStore({
  state() {
    return {
      user: {},
      // 菜单栏展开/收纳
      asideWidth: '250px',
      // 菜单
      menus: [],
      // 角色名称
      ruleNames: []
    }
  },
  mutations: {
    SET_USERINFO(state, user) {
      state.user = user
    },
    // 修改菜单栏展开宽度
    handleAsideWidth(state) {
      state.asideWidth = state.asideWidth == '250px' ? '64px' : '250px'
    },
    // 获取菜单数据
    SET_MENUS(state, menus) {
      state.menus = menus
    },
    // 获取角色数据
    SET_RULE_NAMES(state, ruleNames) {
      state.ruleNames = ruleNames
    }
  },
  actions: {
    // 登录
    login({ commit }, { username, password }) {
      return new Promise((reslove, reject) => {
        login(username, password)
          .then(res => {
            sessionStorage.setItem('admin-token', res.token)
            reslove(res)
          })
          .catch(err => reject(err))
      })
    },

    // 获取当前登录用户
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(res => {
            commit('SET_USERINFO', res)
            commit('SET_MENUS', res.menus)
            commit('SET_RULE_NAMES', res.ruleNames)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 退出登录
    logout({ commit }) {
      // 清除token
      sessionStorage.removeItem('admin-token')
      // 移除用户信息
      commit('SET_USERINFO', {})
    }
  }
})

export default store
