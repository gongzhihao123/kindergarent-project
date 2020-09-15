import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

// 基本数据管理
const Login = () => import('@/views/login.vue')

// 门户网站
const portal = () => import('@/views/portal/index.vue')

// 消息通知模板
const notice = () => import('@/views/notice/index.vue')

// 新闻动态
const noticeNews = () => import('@/views/notice/noticeNews.vue')

// 通知公告
const noticeAnnounce = () => import('@/views/notice/noticeAnnounce.vue')

// 学校主题活动
const noticeThemeActive = () => import('@/views/notice/noticeThemeActive.vue')

// 教育资讯
const noticeEducation = () => import('@/views/notice/noticeEducation.vue')

// 健康资讯
const noticeHealth = () => import('@/views/notice/noticeHealth.vue')

// 通知详情页
const noticeDetail = () => import('@/views/notice/noticeDetail.vue')

// 保健所主页
const HomePage = () => import('@/views/portal/homePage.vue')

// 基本数据管理
const Home = () => import('@/views/Home.vue')

// 应用管理
// const applyManage = () => import('@/views/applyManage')

// 流程管理
const procedureManage = () => import('@/views/procedureManage/index')

// 流程处理
const proceHandle = () => import('@/views/procedureManage/proceHandle')

const routes = [
  // 流程管理
  {
    path: '/',
    redirect: '/procedureManage',
    component: Home,
    meta: { isNav: false, title: '流程管理' },
    children: [
      {
        path: '/procedureManage',
        name: 'procedureManage',
        component: procedureManage,
        meta: { hidden: true, title: '流程管理' }
      },
      {
        path: '/proceHandle',
        name: 'proceHandle',
        component: proceHandle,
        meta: { hidden: false, title: '流程管理' }
      }
    ]
  },
  // // 应用管理
  // {
  //   path: '/applyManage',
  //   component: Home,
  //   meta: { isNav: false, title: '应用管理' },
  //   children: [
  //     {
  //       path: '/applyManage',
  //       name: 'applyManage',
  //       component: applyManage,
  //       meta: { hidden: true, title: '应用管理' }
  //     }
  //   ]
  // },
  // 门户网站and个人主页
  {
    path: '/homePage',
    name: 'homePage',
    component: HomePage,
    meta: { title: '保健所主页' }
  },
  {
    path: '/notice',
    name: 'notice',
    component: notice,
    meta: { title: '消息中心' },
    children: [
      {
        path: '/notice/noticeNews',
        name: 'noticeNews',
        component: noticeNews,
        meta: { title: '新闻动态' }
      },
      {
        path: '/notice/noticeAnnounce',
        name: 'noticeAnnounce',
        component: noticeAnnounce,
        meta: { title: '通知公告' }
      },
      {
        path: '/notice/noticeThemeActive',
        name: 'noticeThemeActive',
        component: noticeThemeActive,
        meta: { title: '学校主题活动' }
      },
      {
        path: '/notice/noticeEducation',
        name: 'noticeEducation',
        component: noticeEducation,
        meta: { title: '教育资讯' }
      },
      {
        path: '/notice/noticeHealth',
        name: 'noticeHealth',
        component: noticeHealth,
        meta: { title: '健康资讯' }
      },
      {
        path: '/notice/noticeDetail',
        name: 'noticeDetail',
        component: noticeDetail,
        meta: { title: '通知详情页' }
      }
    ]
  },
  {
    path: '/portal',
    name: 'portal',
    component: portal,
    meta: { title: '门户网站' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
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
