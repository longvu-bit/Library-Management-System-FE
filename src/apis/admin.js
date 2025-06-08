import axiosInstance from '../utils/axiosInterceptor'

//User APIs

//Book APIs

//Borrow APIs

//Author APIs
export const fetchAllAuthorsAPI = async (page = 1, search = '') => {
  const response = await axiosInstance.get(`/authors?page=${page}&search=${search}`)
  return response.data
}

export const createAuthorAPI = async (newAuthor) => {
  const response = await axiosInstance.post(`/authors`, newAuthor)
  return response.data
}

export const updateAuthorAPI = async (updateData, id) => {
  const response = await axiosInstance.put(`/authors/${id}`, updateData)
  return response.data
}

export const deleteAuthorAPI = async (id) => {
  return await axiosInstance.delete(`/authors/${id}`)
}

//Publisher APIs

//Category APIs
