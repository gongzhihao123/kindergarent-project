import Vue from 'vue'
import Router from 'vue-router'

import riskRoutes from './modules/risk'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const Home = () => import('@/layout/index.vue')

export const constantRoutes = [
  {
    path: '/redirect',
    component: Home,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Home,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/system',
    component: Home,
    name: 'system',
    meta: {
      title: '系统设置',
      icon: '404',
      roles: ['admin']
    },
    children: [
      {
        path: 'dict',
        component: () => import('@/views/system/dict/index'),
        name: 'dict',
        meta: { title: '字典管理', noCache: true }
      },
      {
        path: 'user',
        component: () => import('@/views/system/user/index'),
        name: 'user',
        meta: { title: '用户管理', noCache: true }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: 'role',
        meta: { title: '角色管理', noCache: true }
      },
      {
        path: 'Permission',
        component: () => import('@/views/system/permission/index'),
        name: 'Permission',
        meta: { title: '权限管理', noCache: true }
      }
    ]
  },
  riskRoutes
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
