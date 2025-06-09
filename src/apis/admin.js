import axiosInstance from '../utils/axiosInterceptor'

//User APIs
export const fetchAllUsersAPI = async (page, search, sortBy, order) => {
  const params = new URLSearchParams({
    page,
    search,
    sortBy,
    order,
  })
  const response = await axiosInstance.get(`/users?${params.toString()}`)
  return response.data
}

export const createUserAPI = async (newUser) => {
  const response = await axiosInstance.post(`/users`, newUser)
  return response.data
}

export const updateUserAPI = async (updateData, id) => {
  const response = await axiosInstance.put(`/users/${id}`, updateData)
  return response.data
}

export const deleteUserAPI = async (id) => {
  return await axiosInstance.delete(`/users/${id}`)
}

//Book APIs
export const fetchAllBooksAPI = async (page, search, sortBy, order) => {
  const params = new URLSearchParams({
    page,
    search,
    sortBy,
    order,
  })
  const response = await axiosInstance.get(`/books?${params.toString()}`)
  return response.data
}

export const createBookAPI = async (newBook) => {
  const response = await axiosInstance.post(`/books`, newBook)
  return response.data
}

export const updateBookAPI = async (updateData, id) => {
  const response = await axiosInstance.put(`/books/${id}`, updateData)
  return response.data
}

export const deleteBookAPI = async (id) => {
  return await axiosInstance.delete(`/books/${id}`)
}

//Borrow APIs

//Author APIs
export const fetchAllAuthorsAPI = async (page, search, sortBy, order) => {
  const params = new URLSearchParams({
    page,
    search,
    sortBy,
    order,
  })
  const response = await axiosInstance.get(`/authors?${params.toString()}`)
  return response.data
}

export const fetchAllAUthorNoPaginationAPI = async () => {
  const response = await axiosInstance.get(`/authors/all`)
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

export const fetchAllPublishersAPI = async (page, search, sortBy, order) => {
  const params = new URLSearchParams({
    page,
    search,
    sortBy,
    order,
  })
  const response = await axiosInstance.get(`/publishers?${params.toString()}`)
  return response.data
}

export const fetchAllPublisherNoPaginationAPI = async () => {
  const response = await axiosInstance.get(`/publishers/all`)
  return response.data
}

export const createPublisherAPI = async (newPublisher) => {
  const response = await axiosInstance.post(`/publishers`, newPublisher)
  return response.data
}

export const updatePublisherAPI = async (updateData, id) => {
  const response = await axiosInstance.put(`/publishers/${id}`, updateData)
  return response.data
}

export const deletePublisherAPI = async (id) => {
  return await axiosInstance.delete(`/publishers/${id}`)
}

//Category APIs

export const fetchAllCategoriesAPI = async () => {
  const response = await axiosInstance.get(`/categories`)
  return response.data
}

export const createCategoryAPI = async (newCategory) => {
  const response = await axiosInstance.post(`/categories`, newCategory)
  return response.data
}

export const updateCategoryAPI = async (updateData, id) => {
  const response = await axiosInstance.put(`/categories/${id}`, updateData)
  return response.data
}

export const deleteCategoryAPI = async (id) => {
  return await axiosInstance.delete(`/categories/${id}`)
}
