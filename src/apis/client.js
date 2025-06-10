import axiosInstance from '../utils/axiosInterceptor'

export const fetchAllBooksClientAPI = async (searchPath) => {
  const response = await axiosInstance.get(`/books${searchPath}`)
  return response.data
}

export const fetchBookDetailClientAPI = async (id) => {
  const response = await axiosInstance.get(`/books/${id}`)
  return response.data
}

export const fetchAllCartByUserClientAPI = async (id) => {
  const response = await axiosInstance.get(`/carts/${id}`)
  return response.data
}

export const createCartClientAPI = async (user, book) => {
  const response = await axiosInstance.post(`/carts`, { user, book })
  return response.data
}
