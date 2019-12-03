/*
    可疑交易分析系统
    Suspicious Transaction Analysis System
*/

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import axios from './http'
import echarts from 'echarts'


import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'

// ES6 兼容组件
import 'babel-polyfill';
import promise from 'es6-promise';

promise.polyfill();

Vue.use(ElementUI)
Vue.use(VueI18n)

Vue.config.productionTip = false
Vue.config.silent = true

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios

import LangEn from '../static/lang/en'
import LangCn from '../static/lang/cn'
import LangCt from '../static/lang/ct'

const i18n = new VueI18n({
  locale: 'cn',
  messages: {
    'en': LangEn,
    'cn': LangCn,
    'ct': LangCt
  }
})

new Vue({
  el: '#app',
  router,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
