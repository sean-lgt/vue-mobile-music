import axios from 'axios'
import qs from 'qs'
// import router from '@/router/index.js'
import { Message } from 'element-ui'

function showMessage(value) {
  return Message({
    showClose: true,
    message: value,
    type: 'error',
    duration: 3500
  })
}

// 设置请求超时时间 1小时
axios.defaults.timeout = 1000 * 3600
axios.defaults.withCredentials = false

/**
 * 请求拦截器 给每个接口添加token
 */
axios.interceptors.request.use(
  config => {
    // 在此处统一配置公共参数
    // config.headers.Authorization =
    //   'Bearerb ' + localStorage.getItem('accessToken')
    // config.headers.ContentType = 'application/json'

    if (config.method === 'get') {
      // 所有的get请求  数组形式统一序列化
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    return config
  },
  error => {
    Promise.reject(error) // 错误提示
  }
)

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
  return response.data
})

export default axios
