import axiosInstance from '../utils/axiosInterceptor'

export const registerAPI = async (data) => {
  const response = await axiosInstance.post('/auth/register', data)

  return response.data
}

export const loginAPI = async (data) => {
  const response = await axiosInstance.post('/auth/login', data)

  return response.data
}

export const logoutAPI = async () => {
  const response = await axiosInstance.post('/auth/logout')

  localStorage.removeItem('user')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessToken')

  return response
}

export const refreshTokenAPI = async () => {
  const response = await axiosInstance.post('/auth/refresh-token')

  return response.data
}
