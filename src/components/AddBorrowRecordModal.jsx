/* eslint-disable no-unused-vars */

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toDateInputValue } from '../../utils/formatters'

const AddBorrowRecordModal = ({ onClose, onSubmit, bookEdit }) => {
  const [categories, setCategories] = useState([])
  const [publishers, setPublishers] = useState([])
  const [authors, setAuthors] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // fix bug không đổ dữ liệu vào select
  const [isDataReady, setIsDataReady] = useState(false)

  useEffect(() => {}, [])

  const handleAddBorrowRecord = (data) => {
    onSubmit()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <form onSubmit={handleSubmit(handleAddBorrowRecord)}>
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

export default AddBorrowRecordModal
