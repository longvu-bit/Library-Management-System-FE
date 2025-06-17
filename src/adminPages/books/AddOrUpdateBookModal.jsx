/* eslint-disable no-unused-vars */

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toDateInputValue } from '../../utils/formatters'
import {
  fetchAllCategoriesAPI,
  fetchAllAUthorNoPaginationAPI,
  fetchAllPublisherNoPaginationAPI,
} from '../../apis/admin'

const AddOrUpdateBookModal = ({ onClose, onSubmit, bookEdit }) => {
  const [categories, setCategories] = useState([])
  const [publishers, setPublishers] = useState([])
  const [authors, setAuthors] = useState([])

  console.log(bookEdit)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // fix bug không đổ dữ liệu vào select
  const [isDataReady, setIsDataReady] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [cats, auths, pubs] = await Promise.all([
        fetchAllCategoriesAPI(),
        fetchAllAUthorNoPaginationAPI(),
        fetchAllPublisherNoPaginationAPI(),
      ])

      setCategories(cats)
      setAuthors(auths)
      setPublishers(pubs)
      setIsDataReady(true)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (bookEdit && isDataReady) {
      const preparedData = {
        ...bookEdit,
        author: bookEdit.author?._id || '',
        publisher: bookEdit.publisher?._id || '',
        category: bookEdit.category?._id || '',
        image: bookEdit.image[0],
      }

      reset(preparedData)
    }
  }, [bookEdit, isDataReady, reset])

  const handleCreateOrUpdateBook = (data) => {
    if (bookEdit) {
      const idEdit = bookEdit._id
      console.log(idEdit)
      onSubmit(data, idEdit)
    } else {
      onSubmit(data)
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <form onSubmit={handleSubmit(handleCreateOrUpdateBook)}>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            type="button"
          >
            <X />
          </button>
          <h2 className="text-xl font-bold mb-4">{bookEdit ? 'Cập nhật sách' : 'Thêm sách mới'}</h2>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tên sách</label>
            <input
              {...register('title', {
                required: 'Vui lòng nhập tên sách',
                minLength: { value: 2, message: 'Ít nhất 2 ký tự' },
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              type="text"
              placeholder="Nhập tên sách..."
            />
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <textarea
              {...register('description')}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              rows="3"
              placeholder="Mô tả sách..."
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Link ảnh</label>
            <input
              {...register('image')}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              type="text"
              placeholder="Link hình ảnh..."
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tác giả</label>
            <select
              {...register('author', { required: 'Vui lòng chọn tác giả' })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">-- Chọn tác giả --</option>
              {authors.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.name}
                </option>
              ))}
            </select>
            {errors.author && <p className="text-red-600">{errors.author.message}</p>}
          </div>

          {/* Publisher */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nhà xuất bản</label>
            <select
              {...register('publisher', { required: 'Vui lòng chọn NXB' })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">-- Chọn NXB --</option>
              {publishers.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.publisher && <p className="text-red-600">{errors.publisher.message}</p>}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <select
              {...register('category', { required: 'Vui lòng chọn danh mục' })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-600">{errors.category.message}</p>}
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Số lượng</label>
            <input
              {...register('quantity', {
                required: 'Vui lòng nhập số lượng',
                min: { value: 0, message: 'Không được âm' },
              })}
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.quantity && <p className="text-red-600">{errors.quantity.message}</p>}
          </div>

          {/* Available */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Số lượng có sẵn</label>
            <input
              {...register('available', {
                required: 'Vui lòng nhập số lượng có sẵn',
                min: { value: 0, message: 'Không được âm' },
              })}
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.available && <p className="text-red-600">{errors.available.message}</p>}
          </div>

          {/* Published Year */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Năm xuất bản</label>
            <input
              {...register('publishedYear', {
                required: 'Vui lòng nhập năm xuất bản',
                min: {
                  value: 1000,
                  message: 'Năm xuất bản phải lớn hơn 1000',
                },
              })}
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.publishedYear && <p className="text-red-600">{errors.publishedYear.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddOrUpdateBookModal
