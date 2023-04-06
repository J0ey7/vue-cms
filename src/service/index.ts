// service统一出口
// 封装好的axios类
import JHRequest from './request'
import { BASE_URL } from '../environments'
import localCache from '@/util/cache'
const jhRequest = new JHRequest({
  baseURL: BASE_URL,
  interceptors: {
    requestInterceptors: (config) => {
      const token = new localCache().getCache('token')
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      }
      return config
    }
  }
  //   // requestInterceptorsCatch: (err) => {
  //   //   return err
  //   // },
  //   // responsetInterceptors: (config) => {
  //   //   return config
  //   // },
  //   // responseInterceptorsCatch: (err) => {
  //   //   return err
  //   // }
  // }
})
export default jhRequest
