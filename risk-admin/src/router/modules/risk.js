const Home = () => import('@/layout/index.vue')
const kindergarRoutes =
  {
    path: '/risk',
    component: Home,
    name: 'risk',
    meta: {
      title: '幼儿园管理',
      roles: ['admin']
    },
    children: [
      {
        path: 'area',
        component: () => import('@/views/risk/area/index'),
        name: 'area',
        meta: {
          title: '区域管理',
          icon: 'areaset'
        }
      }
    ]
  }

export default kindergarRoutes
