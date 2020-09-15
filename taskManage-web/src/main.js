import Vue from 'vue'
import Router from 'vue-router'
import App from './layout/App.vue'
import './assets/scss/index.scss'
import './plugins/element.js'
import router from './router/index'
import store from './store/index'
import * as filters from './filters/index.js'
// import './styles.scss'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 实例化过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default app
