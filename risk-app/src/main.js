import Vue from 'vue'
import App from './layout/App.vue'
// import Router from 'vue-router'
import router from './router'
import store from './store'
import 'lib-flexible'
import './lib/rem.js'
import * as filters from './filters/index.js'

import './assets/style/index.css'

import FastClick from 'fastclick'
import 'vant/lib/index.css'

import {
  Toast,
  Icon,
  NavBar,
  Button,
  Form,
  Field,
  Popup,
  Picker,
  Sticky,
  Tab,
  Tabs,
  List,
  Cell,
  CellGroup,
  Uploader,
  RadioGroup,
  Radio,
  Step,
  Steps,
  Checkbox,
  CheckboxGroup,
  Image as VanImage,
  Empty,
  Overlay
} from 'Vant'
Vue
  .use(Toast).use(Icon).use(NavBar).use(Button).use(Form).use(Field).use(Popup).use(Picker).use(Sticky)
  .use(Tab).use(Tabs).use(List).use(Cell).use(CellGroup).use(Uploader).use(Radio).use(RadioGroup).use(Step)
  .use(Steps).use(Checkbox).use(CheckboxGroup).use(VanImage).use(Empty).use(Overlay)

FastClick.attach(document.body)

Vue.config.productionTip = false

// 实例化过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
