import axiosInstance from '../utils/axiosInterceptor'

//Book
export const fetchAllBooksClientAPI = async (searchPath) => {
  const response = await axiosInstance.get(`/books${searchPath}`)
  return response.data
}

export const fetchBookDetailClientAPI = async (id) => {
  const response = await axiosInstance.get(`/books/${id}`)
  return response.data
}

//Borrow
export const createBorrowBooksClientAPI = async (data) => {
  const response = await axiosInstance.post('/borrows', data)
  return response.data
}

export const fetchBorrowRecordsByUserClientAPI = async () => {
  const response = await axiosInstance.get(`/borrows/user`)
  return response.data
}

//Cart
export const fetchAllCartByUserClientAPI = async (id) => {
  const response = await axiosInstance.get(`/carts/${id}`)
  return response.data
}

export const createCartClientAPI = async (user, book) => {
  const response = await axiosInstance.post(`/carts`, { user, book })
  return response.data
}

export const updateQuantityCartItemClientAPI = async (id, type) => {
  const response = await axiosInstance.patch(`/carts/${id}?quantity=${type}`)
  return response.data
}

export const deleteCartItemClientAPI = async (id) => {
  return await axiosInstance.delete(`/carts/${id}`)
}
