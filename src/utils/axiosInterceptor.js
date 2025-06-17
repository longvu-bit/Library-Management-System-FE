/* eslint-disable no-unused-vars */
import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { logoutAPI, refreshTokenAPI } from '../apis/auth'

let axiosInstance = axios.create()

axiosInstance.defaults.baseURL = 'http://localhost:8088/api'

axiosInstance.defaults.timeout = 1000 * 60 * 10

// axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.request.use(
  (config) => {
    // kỹ thuật chặn spam click call api nhiều (true là inactive ko cho phép click)
    interceptorLoadingElements(true)

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (accessToken && refreshToken) {
      config.headers.authorization = `Bearer ${accessToken}`
      config.headers.refreshToken = refreshToken
    }

    return config
  },
  (error) => {
    // Handle request error
    toast.error('Request error: ' + error.message)
    return Promise.reject(error)
  },
)

let refreshTokenPromise = null
axiosInstance.interceptors.response.use(
  (response) => {
    // kỹ thuật chặn spam click call api nhiều (true là inactive ko cho phép click)
    interceptorLoadingElements(false)

    return response
  },
  (error) => {
    interceptorLoadingElements(false)

    // UNAUTHORIZED
    if (error.response?.status === 401) {
      logoutAPI()
    }

    //FORBIDDEN
    if (error.response?.status === 403) {
      location.href = '/access-denied'
    }

    // const originalRequests = error.config
    // if (error.response?.status === 410) {
    //   if (!refreshTokenPromise) {
    //     refreshTokenPromise = refreshTokenAPI()
    //       .then((res) => {
    //         return res?.accessToken
    //       })
    //       .catch((_error) => {
    //         logoutAPI()
    //         return Promise.reject(_error)
    //       })
    //       .finally(() => {
    //         refreshTokenPromise = null
    //       })
    //   }

    //   return refreshTokenPromise.then((accessToken) => {
    //     /**
    //      * B1: Doi voi du an can luu accessToken vao localStorage hoac o dau do thi viet them o day
    //      * Hien tai ko can vi BE su dung httpOnly
    //      */

    //     if (!originalRequests.headers) originalRequests.headers = {}

    //     originalRequests.headers.authorization = `Bearer ${accessToken}`
    //     localStorage.setItem('accessToken', accessToken)

    //     // B2: Return lai axios instance ket hop voi originalRequests de goi lai nhung api ban dau bi loi
    //     return axiosInstance(originalRequests)
    //   })
    // }

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
