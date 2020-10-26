import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick'
import ElementUI from 'element-ui'
import axios from './api/apiConfig.js'
import api from '@/api/api.js'
import 'element-ui/lib/theme-chalk/index.css'
import './common/stylus/index.styl'
import pinyin from 'js-pinyin'
import VueLazyload from 'vue-lazyload'
import Vuex from 'vuex'
import store from './store/store'
import Vconsole from 'vconsole'

// fastclick：处理移动端click事件300毫秒延迟。
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$api = api
const vConsole = new Vconsole()
Vue.use(vConsole)
Vue.use(Vuex)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
