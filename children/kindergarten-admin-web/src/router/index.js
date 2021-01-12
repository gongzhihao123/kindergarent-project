import Vue from 'vue'
import Router from 'vue-router'

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
  // {
  //   path: '/OnLineTest',
  //   component: () => import('@/views/onlineAnswers/OnLineTest'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/schoolManage/index'),
  //   hidden: true
  // },
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
    path: '/user',
    component: Home,
    children: [
      {
        path: 'index',
        component: () => import('@/views/userManage/index'),
        name: 'Documentation',
        meta: { title: '用户管理', icon: 'user', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/company',
    component: Home,
    children: [
      {
        path: 'index',
        component: () => import('@/views/companyManage/index'),
        name: 'company',
        meta: { title: '单位管理', icon: 'user', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/region',
    component: Home,
    meta: { title: '区域管理', icon: 'user', roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/region/manage'),
        name: 'regionManage',
        meta: { title: '区域设置', icon: 'user', noCache: true, roles: ['admin'] }
      },
      {
        path: 'adminManage',
        component: () => import('@/views/region/adminManage'),
        hidden: true,
        name: 'regionAdminManage',
        meta: { title: '区域管理员设置', icon: 'user', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/risk',
    component: Home,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/risk/index'),
        name: 'risk',
        meta: { title: '安全隐患', icon: 'user', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/departManage',
    component: Home,
    children: [
      {
        path: 'index',
        component: () => import('@/views/departManage/index'),
        name: 'departManage',
        meta: { title: '部门管理', icon: 'user', noCache: true, roles: ['admin'] }
      }
    ]
  }
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
