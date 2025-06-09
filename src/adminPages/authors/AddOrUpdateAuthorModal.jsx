/* eslint-disable no-unused-vars */
// components/AddAuthorModal.jsx
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toDateInputValue } from '../../utils/formatters'

const AddOrUpdateAuthorModal = ({ onClose, onSubmit, authorEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    if (authorEdit) {
      authorEdit.dateOfBirth = toDateInputValue(authorEdit.dateOfBirth)
      reset(authorEdit)
    }
  }, [authorEdit, reset])

  const handleCreateOrUpdateAuthor = (data) => {
    const { name, bio, dateOfBirth } = data

    if (authorEdit) {
      const idEdit = authorEdit._id
      onSubmit(name, bio, dateOfBirth, idEdit)
    } else {
      onSubmit(name, bio, dateOfBirth)
    }

    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-gray-400  bg-opacity-10 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
          <form onSubmit={handleSubmit(handleCreateOrUpdateAuthor)}>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {authorEdit ? 'Cập nhật tác giả' : 'Thêm tác giả mới'}
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tên tác giả</label>
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
                {...register('bio', {
                  required: 'Vui lòng điền tiểu sử!',
                  minLength: {
                    value: 3,
                    message: 'Phải có ít nhất 3 ký tự',
                  },
                  maxLength: {
                    value: 500,
                    message: 'Tối đa 500 ký tự',
                  },
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows="4"
                placeholder="Viết tiểu sử..."
              />
              {errors.bio && <p className="text-red-600">{errors.bio.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Ngày sinh</label>
              <input
                {...register('dateOfBirth', {
                  required: 'Vui lòng chọn ngày sinh!',
                })}
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.dateOfBirth && <p className="text-red-600">{errors.dateOfBirth.message}</p>}
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

export default AddOrUpdateAuthorModal
