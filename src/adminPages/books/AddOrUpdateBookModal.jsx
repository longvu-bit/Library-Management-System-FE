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
      <div className="fixed inset-0 z-50 bg-gray-400  bg-opacity-10 flex justify-center items-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
          <form onSubmit={handleSubmit(handleCreateOrUpdateBook)}>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{bookEdit ? "Cập nhật sách" : "Thêm sách mới"}</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên sách <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title", {
                    required: "Vui lòng nhập tên sách",
                    minLength: { value: 2, message: "Ít nhất 2 ký tự" },
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  type="text"
                  placeholder="Nhập tên sách..."
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả</label>
                <textarea
                  {...register("description")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  rows="4"
                  placeholder="Mô tả sách..."
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Link ảnh</label>
                <input
                  {...register("image")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Two column layout for selects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Author */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tác giả <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("author", { required: "Vui lòng chọn tác giả" })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">-- Chọn tác giả --</option>
                    {authors.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                  {errors.author && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.author.message}
                    </p>
                  )}
                </div>

                {/* Publisher */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nhà xuất bản <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("publisher", { required: "Vui lòng chọn NXB" })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">-- Chọn NXB --</option>
                    {publishers.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {errors.publisher && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.publisher.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category", { required: "Vui lòng chọn danh mục" })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Three column layout for numbers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số lượng <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("quantity", {
                      required: "Vui lòng nhập số lượng",
                      min: { value: 0, message: "Không được âm" },
                    })}
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="0"
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.quantity.message}
                    </p>
                  )}
                </div>

                {/* Available */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Có sẵn <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("available", {
                      required: "Vui lòng nhập số lượng có sẵn",
                      min: { value: 0, message: "Không được âm" },
                    })}
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="0"
                  />
                  {errors.available && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.available.message}
                    </p>
                  )}
                </div>

                {/* Published Year */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Năm XB <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("publishedYear", {
                      required: "Vui lòng nhập năm xuất bản",
                      min: {
                        value: 1000,
                        message: "Năm xuất bản phải lớn hơn 1000",
                      },
                    })}
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="2024"
                  />
                  {errors.publishedYear && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.publishedYear.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  type="button"
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-sm"
                >
                  {bookEdit ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}

export default AddOrUpdateBookModal
