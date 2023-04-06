import { getPageListData } from '@/service/main/system/system'
import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import dashboard from './main/dashboard/dashboard'
import system from './main/system/system'
import { IStoreType, RootState } from './type'
const store = createStore<RootState>({
  state: () => {
    return {
      info: '',
      entireRole: [],
      entireDepartment: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, payload) {
      state.entireDepartment = payload
    },
    changeEntireRole(state, payload) {
      state.entireRole = payload
    },
    changeEntireMenu(state, payload) {
      state.entireMenu = payload
    }
  },
  actions: {
    // 1.请求部门和角色数据,菜单数据
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      })
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: { login, system, dashboard }
})
export default store
// 为保证刷新后vux里面存储在vuex的数据不清空写一个setupStore的方法
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
