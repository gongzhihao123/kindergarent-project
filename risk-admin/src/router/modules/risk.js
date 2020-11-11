const Home = () => import('@/layout/index.vue')
const kindergarRoutes =
  {
    path: '/risk',
    component: Home,
    name: 'risk',
    meta: {
      title: '幼儿园管理',
      icon: '404',
      roles: ['test']
    },
    children: [
      {
        path: 'area',
        component: () => import('@/views/risk/area/index'),
        name: 'area',
        meta: { title: '区域管理', noCache: true }
      }
    ]
  }

export default kindergarRoutes
