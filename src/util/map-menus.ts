import { Menu } from './../store/type'
import { RouteRecordRaw } from 'vue-router'
// 将所有的菜单路径获取,然后与后台返回的url进行匹配
let firstMenu: Menu | undefined = undefined

export function mapMenusToRoutes(userMenus: Menu[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = []
  /**
   * @params
   * path: 文件路径
   * deep: 可选参数,是否递归搜索
   * RegExp: 匹配的文件
   */
  const routeFiles = require.context('../router/main', true, /\.ts/)

  routeFiles.keys().forEach((key) => {
    const path = key.split('.')[1]
    const route = require(`../router/main${path}`)
    allRoutes.push(route.default)
  })

  //  构造递归函数
  const _recurseGetRoute = (menus: Menu[]) => {
    for (const menu of menus) {
      if (menu.type === 1) {
        if (menu.children && menu.children?.length > 0) {
          _recurseGetRoute(menu.children)
        }
      } else {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 根据当前路径选出当前菜单id
export function selectMenuId(
  menus: Menu[],
  url: string,
  breadcrumbs?: Array<{ name: string; path: string }>
) {
  for (const item of menus) {
    if (item.type === 1) {
      const findMenu: any = selectMenuId(item.children ?? [], url)
      if (findMenu) {
        breadcrumbs?.push({ name: item.name!, path: item.url! })
        breadcrumbs?.push({ name: findMenu.name!, path: findMenu.url! })
        if (breadcrumbs && breadcrumbs.length >= 1) {
          return breadcrumbs
        } else {
          return findMenu
        }
      }
    } else if (item.type === 2 && item.url === url) {
      return item
    }
  }
}

// 获取所有权限数组
export function mapMenusToPermissions(useMenus: any[]) {
  const permissions: string[] = []
  // 构造递归函数
  function findMenusPermission(menus: any[]) {
    for (const item of menus) {
      if (item.children && item.children.length > 0) {
        findMenusPermission(item.children)
      } else {
        if (item.type === 3) {
          permissions.push(item.permission)
        }
      }
    }
  }
  findMenusPermission(useMenus)
  return permissions
}

export function getMenuLeafKeys(menuList: any[]) {
  const leftKeys: Array<number> = []
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children && menu.children.length > 0) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}

export { firstMenu }
