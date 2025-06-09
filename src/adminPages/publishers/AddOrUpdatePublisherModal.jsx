/* eslint-disable no-unused-vars */
// components/AddAuthorModal.jsx
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const AddOrUpdatePublisherModal = ({ onClose, onSubmit, publisherEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    if (publisherEdit) {
      reset(publisherEdit)
    }
  }, [publisherEdit, reset])

  const handleCreateOrUpdateAuthor = (data) => {
    const { name, address, email, phone, website } = data

    if (publisherEdit) {
      const idEdit = publisherEdit._id

      onSubmit(name, address, email, phone, website, idEdit)
    } else {
      onSubmit(name, address, email, phone, website)
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
              {publisherEdit ? 'Cập nhật nhà xuất bản' : 'Thêm nhà xuất bản'}
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
              <label className="block text-sm font-medium mb-1">Địa chỉ</label>
              <textarea
                {...register('address', {
                  required: 'Vui lòng cung cấp địa chỉ!',
                  minLength: {
                    value: 5,
                    message: 'Phải có ít nhất 5 ký tự',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Tối đa 200 ký tự',
                  },
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows="2"
                placeholder="Địa chỉ..."
              />
              {errors.address && <p className="text-red-600">{errors.address.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                {...register('email', {
                  required: 'Vui lòng điền Email!',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Email không hợp lệ',
                  },
                })}
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Email..."
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Số điện thoại</label>
              <input
                {...register('phone', {
                  required: 'Vui lòng điền số điện thoại!',
                  validate: (phone) =>
                    phone.match(/\d/g).length === 10 || 'Số điện thoại không hợp lệ',
                })}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Số điện thoại..."
              />
              {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Địa chỉ website</label>
              <input
                {...register('website', {
                  required: 'Vui lòng điền Website address!',
                })}
                type="website"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Website address..."
              />
              {errors.website && <p className="text-red-600">{errors.website.message}</p>}
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

export default AddOrUpdatePublisherModal
