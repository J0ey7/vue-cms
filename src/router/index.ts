import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/util/cache'
import { firstMenu } from '@/util/map-menus'

const routes: Array<RouteRecordRaw> = [
  {
    redirect: '/main',
    path: '/'
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/main',
    name: 'main', //要想使用router.addRoute必须传入name属性
    component: () => import('@/views/main/HomeView.vue')
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = new localCache().getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path == '/main') {
    return firstMenu?.url
  }
})

export default router
