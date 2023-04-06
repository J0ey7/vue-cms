import { RootState, systemState } from '../../type'
import { Module } from 'vuex'
import {
  createPageData,
  delepageItem,
  editPageData,
  getPageListData
} from '@/service/main/system/system'

const systemModule: Module<systemState, RootState> = {
  namespaced: true,
  state: () => {
    return {
      userList: [],
      roleList: [],
      userCount: 0,
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUserList(state, payload) {
      state.userList = payload
    },
    changeUserCount(state, payload) {
      state.userCount = payload
    },
    changeRoleList(state, payload) {
      state.roleList = payload
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload
    },
    changeGoodsList(state, payload) {
      state.goodsList = payload
    },
    changeGoodsCount(state, payload) {
      state.goodsCount = payload
    },
    changeMenuList(state, payload) {
      state.menuList = payload
    },
    changeMenuCount(state, payload) {
      state.menuCount = payload
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'User':
            return state.userList
          case 'Role':
            return state.roleList
          case 'Goods':
            return state.goodsList
          case 'Menu':
            return state.menuList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'User':
            return state.userCount
          case 'Role':
            return state.roleCount
          case 'Goods':
            return state.goodsCount
          case 'Menu':
            return state.menuCount
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      const pageName = payload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'User':
          pageUrl = '/users/list'
          break
        case 'Role':
          pageUrl = '/role/list'
          break
        case 'Goods':
          pageUrl = '/goods/list'
          break
        case 'Menu':
          pageUrl = '/menu/list'
      }

      const result = await getPageListData(pageUrl, payload.params)
      const { list, totalCount } = result.data
      commit(`change${pageName}List`, list)
      commit(`change${pageName}Count`, totalCount)
    },
    async deletePageItemAction({ dispatch }, payload) {
      const { pageName, id } = payload
      let pageUrl = ''
      switch (pageName) {
        case 'User':
          pageUrl = 'users'
          break
        case 'Role':
          pageUrl = 'role'
          break
        case 'Goods':
          pageUrl = 'goods'
          break
        case 'Menu':
          pageUrl = 'menu'
      }
      delepageItem(`/${pageUrl}/${id}`)
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 新建用户
    async createPageItemAction({ dispatch }, payload) {
      const { pageName, params, type } = payload
      const pageUrl = `/${pageName}`
      createPageData(pageUrl, params)
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName: type,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 编辑用户
    async editPageItemAction({ dispatch }, payload) {
      const { pageName, params, type, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, params)
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName: type,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
