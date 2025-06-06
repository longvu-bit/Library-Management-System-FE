import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

let axiosInstance = axios.create()

axiosInstance.defaults.baseURL = 'http://localhost:8017/api'

axiosInstance.defaults.timeout = 1000 * 60 * 10

axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.request.use(
  (config) => {
    // kỹ thuật chặn spam click call api nhiều (true là inactive ko cho phép click)
    interceptorLoadingElements(true)

    return config
  },
  (error) => {
    // Handle request error
    toast.error('Request error: ' + error.message)
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    // kỹ thuật chặn spam click call api nhiều (true là inactive ko cho phép click)
    interceptorLoadingElements(false)

    return response
  },
  (error) => {
    // Xử lý lỗi phản hồi tập trung
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    //ngoại trừ mã 410 - GONE phục vụ việc tự động refresh token
    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
