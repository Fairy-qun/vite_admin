import { createStore } from 'vuex'
import { login, getUserInfo } from '@/api/manager.js'

const store = createStore({
  state() {
    return {
      user: {}
    }
  },
  mutations: {
    SET_USERINFO(state, user) {
      state.user = user
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
