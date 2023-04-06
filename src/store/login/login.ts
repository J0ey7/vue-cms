import { RootState } from './../type'
import { Module } from 'vuex'
import { LoginState } from '../type'
import {
  accounteLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/util/cache'
import router from '@/router'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/util/map-menus'

const loginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state: () => {
    return {
      info: '登录模块里面的信息',
      token: '',
      userInfo: '',
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, payload) {
      state.token = payload
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload) {
      state.userMenus = payload
      console.log('注册动态路由')
      console.log(payload)
      // 1.将后端返回的userMenus全部获取然后转为route
      const routes = mapMenusToRoutes(payload)
      state.permissions = mapMenusToPermissions(payload)
      // 2.将route添加到router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
    // phoneLogin(state, payload) {
    //   console.log('手机登录成功')
    // }
  },
  actions: {
    // 账户登录
    async accountLoginAction({ commit }, payload) {
      // 本地存储器
      const cache = new localCache()
      // 1.登录逻辑
      const loginResult = await accounteLoginRequest(payload)
      const { token, id } = loginResult.data
      // 将token本地存储起来
      cache.setCache('token', token)
      commit('changeToken', token)
      // 发送初始化请求（完整的role、department）

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      cache.setCache('userInfo', userInfo)
      commit('changeUserInfo', userInfo)

      // 3.请求用户菜单数据
      if (userInfo.role.id) {
        const userMenuResult = await requestUserMenusByRoleId(userInfo.role.id)
        const userMenus = userMenuResult.data
        cache.setCache('userMenus', userMenus)
        commit('changeUserMenus', userMenus)
      }
      // 4.跳到首页
      router.push('/main')
    },
    // 为保证页面刷新后，vuex里面的数据不清空而封装的方法
    loadLocalLogin({ commit }) {
      const cache = new localCache()
      const token = cache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = cache.getCache('userInfo')
      if (token) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = cache.getCache('userMenus')
      if (token) {
        commit('changeUserMenus', userMenus)
      }
    },

    phoneLoginAction({ commit }, payload) {
      commit('phoneLogin', payload)
    }
  }
}
export default loginModule
