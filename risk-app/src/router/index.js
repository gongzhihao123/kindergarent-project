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
      { path: '/dispose', name: 'dispose', component: () => import('./../views/repairDetail/dispose.vue') },
      { path: '/list', name: 'list', component: () => import('./../views/list/index.vue') }
    ]
  },
  
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
