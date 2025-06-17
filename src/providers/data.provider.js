import axiosInstance from '../utils/axiosInterceptor'

const dataProvider = {
  getList: async (resource, page, search, sortBy, order) => {
    const params = new URLSearchParams({
      page,
      search,
      sortBy,
      order,
    })
    const { data } = await axiosInstance.get(`/${resource}?${params.toString()}`)
    return data
  },
  getById: async (resource, id) => {
    const { data } = await axiosInstance.get(`/${resource}/${id}`)
    return data
  },
  create: async (resource, data) => {
    const response = await axiosInstance.post(`/${resource}`, data)
    return response.data
  },
  update: async (resource, id, data) => {
    console.log(data)
    const response = await axiosInstance.put(`/${resource}/${id}`, data)
    return response.data
  },
  remove: async (resource, id) => {
    return await axiosInstance.delete(`/${resource}/${id}`)
  },
}

export const { getList, getById, create, update, remove } = dataProvider
