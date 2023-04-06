import {
  account,
  TBL_loginResult,
  TBL_UserMenu,
  typeLogin,
  typeUser
} from './type'
import jhRequest from '../index'

enum urlAll {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
// 用户登录
function accounteLoginRequest(account: account) {
  return jhRequest.post<TBL_loginResult<typeLogin>>({
    url: urlAll.AccountLogin,
    data: account
  })
}
// 用户信息
function requestUserInfoById(id: number) {
  return jhRequest.get<TBL_loginResult<typeUser>>({
    url: urlAll.LoginUserInfo + id
  })
}
// 用户权限获取菜单信息
function requestUserMenusByRoleId(id: number) {
  return jhRequest.get<TBL_loginResult<TBL_UserMenu>>({
    url: urlAll.UserMenus + id + '/menu'
  })
}

export { accounteLoginRequest, requestUserInfoById, requestUserMenusByRoleId }
