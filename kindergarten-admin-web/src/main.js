import Vue from 'vue'
import App from './layout/App.vue'
import './assets/styles/index.scss'
import './assets/scss/reset.scss'
import './plugins/element.js'
import router from './router/index'
import * as filters from './filters'
import store from './store/index'
import './icons' // icon
import './permission' // permission control

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

// 实例化过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default app
