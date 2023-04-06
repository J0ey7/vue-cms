import { typeUser } from '@/service/login/type'
import { IDashboardState } from './main/dashboard/type'

export interface RootState {
  info: string
  entireRole?: Array<any>
  entireDepartment?: Array<any>
  entireMenu?: Array<any>
}
export interface LoginState {
  info?: string
  name?: string
  pass?: string
  token?: string
  userInfo?: any
  userMenus?: Array<Menu>
  permissions?: Array<string>
}
export interface IRootWithModule {
  login: LoginState
  system: systemState
  dashboard: IDashboardState
}
export type IStoreType = LoginState & IRootWithModule

export interface Menu {
  url?: string
  type?: number
  sort?: number
  name?: string
  id?: number
  icon?: string
  parentId?: number
  children?: Array<Menu>
}

export interface systemState {
  userList?: any
  userCount?: number
  roleList?: Array<any>
  roleCount?: number
  goodsList?: Array<any>
  goodsCount?: number
  menuList?: Array<any>
  menuCount?: number
}
