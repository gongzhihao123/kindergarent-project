import Vue from 'vue'
import App from './layout/App.vue'
import router from './router'
import store from './store'
// import "./plugins/element.js";
import './assets/css/index.scss'
import * as filters from './filters/index'

Vue.config.productionTip = false
// 实例化过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
