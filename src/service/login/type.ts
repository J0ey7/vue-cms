export interface account {
  name: string
  password: string
}
// 登录接口返回值类型
export interface typeLogin {
  id: number
  name: string
  token: string
}
// 用户信息
export interface typeUser {
  id?: number
  name?: string
  realname?: string
  cellphone?: number
  enable?: number
  createAt?: string
  updateAt?: string
  role: TBL_Role
  department: TBL_Department
}
// 用户获取菜单类型
export interface TBL_UserMenu {
  id?: number
  name?: string
  type?: number
  url?: string
  icon?: string
  sort?: number
  parentId?: number
  permission?: string
  children?: Array<TBL_UserMenu>
}

export interface TBL_loginResult<T> {
  code: number
  data: T
}

export interface TBL_Role {
  id?: number
  name?: string
  intro?: string
  createAt?: string
  updateAt?: string
}
export interface TBL_Department {
  id?: number
  name?: string
  parentId?: string | null
  createAt?: string
  updateAt?: string
  leader?: string
}
