/* eslint-disable no-unused-vars */
// components/AddCategoryModal.jsx
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const AddOrUpdateCategoryModal = ({ onClose, onSubmit, categoryEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    if (categoryEdit) reset(categoryEdit)
  }, [categoryEdit, reset])

  const handleCreateOrUpdateCategory = (data) => {
    const { name, description } = data

    if (categoryEdit) {
      const idEdit = categoryEdit._id
      onSubmit(name, description, idEdit)
    } else {
      onSubmit(name, description)
    }

    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-gray-400  bg-opacity-10 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
          <form onSubmit={handleSubmit(handleCreateOrUpdateCategory)}>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {categoryEdit ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tên danh mục</label>
              <input
                {...register('name', {
                  required: 'Vui lòng điền tên!',
                  minLength: {
                    value: 3,
                    message: 'Tên phải có ít nhất 3 ký tự',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Tối đa 30 ký tự',
                  },
                })}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Nhập tên..."
              />
              {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tiểu sử</label>
              <textarea
                {...register('description', {
                  required: 'Vui lòng điền mô tả!',
                  minLength: {
                    value: 5,
                    message: 'Phải có ít nhất 5 ký tự',
                  },
                  maxLength: {
                    value: 500,
                    message: 'Tối đa 500 ký tự',
                  },
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows="4"
                placeholder="Mô tả..."
              />
              {errors.description && <p className="text-red-600">{errors.description.message}</p>}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Hủy
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddOrUpdateCategoryModal
