import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./../views/register.vue')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/homePage',
    component: index,
    children: [
      { path: '/homePage', name: 'homePage', component: () => import('./../views/home/homePage.vue') },
      { path: '/home', name: 'home', component: () => import('./../views/home/index.vue') },
      { path: '/repair', name: 'repair', component: () => import('./../views/repair/index.vue') },
      { path: '/list', name: 'list', component: () => import('./../views/list/index.vue') },
      { path: '/taskManage', name: 'taskManage', component: () => import('./../views/taskManage/index.vue') },
      { path: '/taskAdd', name: 'taskAdd', component: () => import('./../views/taskManage/taskAdd.vue') },
      { path: '/taskHandle1', name: 'taskHandle1', component: () => import('./../views/taskManage/taskHandle/handle1.vue') }
    ]
  },
  {
    path: '/dispose',
    name: 'dispose',
    component: index,
    children: [
      { path: '/dispose1', name: 'dispose1', component: () => import('./../views/repairDetail/1.vue') },
      { path: '/dispose2', name: 'dispose2', component: () => import('./../views/repairDetail/2.vue') },
      { path: '/dispose3', name: 'dispose3', component: () => import('./../views/repairDetail/3.vue') },
      { path: '/dispose4', name: 'dispose4', component: () => import('./../views/repairDetail/4.vue') },
      { path: '/dispose5', name: 'dispose5', component: () => import('./../views/repairDetail/5.vue') },
      { path: '/dispose6', name: 'dispose6', component: () => import('./../views/repairDetail/6.vue') },
      { path: '/dispose7', name: 'dispose7', component: () => import('./../views/repairDetail/7.vue') },
      { path: '/declaredDetail', name: 'declaredDetail', component: () => import('./../views/repairDetail/declaredDetail.vue') }
    ]
  }
  
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
