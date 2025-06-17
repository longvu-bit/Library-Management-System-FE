import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { create, getById, getList, remove, update } from '../providers/data.provider'

export const useGetList = (resource, { page = 1, search = '', sortBy = '', order = '' } = {}) => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: [resource, page, search, sortBy, order],
    queryFn: async () => {
      return await getList(resource, page, search, sortBy, order)
    },
    keepPreviousData: true, // giữ dữ liệu cũ trong khi loading page mới
    onSuccess: () => {
      queryClient.invalidateQueries([resource])
    },
  })
}

export const useGetById = (resource, id) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: async () => {
      return await getById(resource, id)
    },
    enabled: !!id, //tránh gọi query khi id chưa có
  })
}

export const useCreate = (resource) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => create(resource, data),
    onSuccess: () => {
      queryClient.invalidateQueries([resource])
    },
  })
}

export const useUpdate = (resource) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => {
      update(resource, id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([resource])
    },
  })
}

export const useRemove = (resource) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => remove(resource, id),
    onSuccess: () => {
      queryClient.invalidateQueries([resource])
    },
  })
}
