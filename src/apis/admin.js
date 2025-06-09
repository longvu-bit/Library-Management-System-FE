import axiosInstance from '../utils/axiosInterceptor'

//User APIs

//Book APIs

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
