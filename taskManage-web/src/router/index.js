import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const routes = [
  // 任务管理
  {
    path: '/',
    redirect: '/procedureManage',
    component: resolve => (require(['@/views/Home.vue'], resolve)),
    meta: { isNav: false, title: '任务管理' },
    children: [
      {
        path: '/procedureManage',
        name: 'procedureManage',
        component: resolve => (require(['@/views/procedureManage/index'], resolve)),
        meta: { hidden: true, title: '任务管理' }
      },
      {
        path: '/proceHandle',
        name: 'proceHandle',
        component: resolve => (require(['@/views/procedureManage/proceHandle'], resolve)),
        meta: { hidden: false, title: '任务管理' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => (require(['@/views/login.vue'], resolve)),
    meta: { title: '登录' }
  }
]

const router = new Router({
  routes
})
router.beforeEach((to, form, next) => {
  NProgress.start()
  next()
})

router.afterEach((transition) => {
  NProgress.done()
})

export default router
