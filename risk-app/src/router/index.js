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
    redirect: '/home',
    component: index,
    children: [
      { path: '/home', name: 'home', component: () => import('./../views/home/index.vue') },
      { path: '/repair', name: 'repair', component: () => import('./../views/repair/index.vue') },
      // { path: '/dispose', name: 'dispose', component: () => import('./../views/repairDetail/dispose.vue') },
      // { path: '/1', name: '1', component: () => import('./../views/repairDetail/1.vue') },
      { path: '/list', name: 'list', component: () => import('./../views/list/index.vue') }
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
      { path: '/dispose6', name: 'dispose6', component: () => import('./../views/repairDetail/6.vue') }
    ]
  }
  
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
