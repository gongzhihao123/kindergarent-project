const Home = () => import('@/layout/index.vue')
const taskManageRoutes =
  {
    path: '/taskManage',
    component: Home,
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/taskManage/index'),
        name: 'index',
        meta: { title: '任务管理', icon: 'riskset', noCache: true }
      },
      {
        path: 'proceHandle',
        component: () => import('@/views/taskManage/proceHandle'),
        hidden: true,
        name: 'proceHandle',
        meta: { title: '任务处理', noCache: true }
      }
    ]
  }

export default taskManageRoutes
