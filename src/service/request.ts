import { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
interface JHRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responsetInterceptors?: (config: any) => any
  responseInterceptorsCatch?: (err: any) => any
}

// 返回的数据类型
export interface DataType {
  data: any
  returnCode: string
  success: boolean
}

interface JHAxiosRequestConfig extends AxiosRequestConfig {
  interceptors?: JHRequestInterceptors
}

class JHRequest {
  instance: AxiosInstance
  interceptors?: JHRequestInterceptors
  constructor(config: JHAxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responsetInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 添加所有的实例拦截器
    this.instance.interceptors.request.use((config) => {
      return config
    })
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        console.log('所有的实例拦截器都有的响应失败拦截器')
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }
  request<T>(config: JHAxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //  1.单个请求对请求config的处理
          if (config.interceptors?.responsetInterceptors) {
            config = config.interceptors.responsetInterceptors(config)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T>(config: JHAxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: 'GET'
    })
  }
  post<T>(config: JHAxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: 'POST'
    })
  }
  delete<T>(config: JHAxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: 'DELETE'
    })
  }
  patch<T = any>(config: JHAxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default JHRequest
