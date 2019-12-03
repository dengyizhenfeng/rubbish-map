/*
    http 配置
*/
'use strict'

import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'

// 设置接口地址
// axios.defaults.baseURL = 'http://120.79.76.250/api/'

// 设置超时时间
axios.defaults.timeout = 5000

//http 拦截器
var loadinginstace

// axios.interceptors.request.use(config => {
//   // element ui Loading方法
//   loadinginstace = Loading.service({
//     fullscreen: true
//   })
//   return config
// }, error => {
//   loadinginstace.close()
//   Message.error({
//     message: '加载超时'
//   })
//   return Promise.reject(error)
// })
//
// // http响应拦截器
// axios.interceptors.response.use(data => { // 响应成功关闭loading
//   loadinginstace.close()
//   return data
// }, error => {
//   loadinginstace.close()
//   Message.error({
//     message: '加载失败'
//   })
//   return Promise.reject(error)
// })

export default axios
