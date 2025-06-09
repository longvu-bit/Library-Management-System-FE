'use client'

import { useEffect, useState } from 'react'
import { Search, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown, Plus, Tag, Eye } from 'lucide-react'
import { toast } from 'react-toastify'
import {
  createCategoryAPI,
  deleteCategoryAPI,
  fetchAllCategoriesAPI,
  updateCategoryAPI,
} from '../../apis/admin'
import AddOrUpdateCategoryModal from './AddOrUpdateCategoryModal'

const CategoryManager = () => {
  const [categories, setCategories] = useState([])

  const [totalCategories, setTotalCategories] = useState(0)

  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  useEffect(() => {
    fetchAllCategoriesAPI().then((res) => {
      setCategories(res)
      setTotalCategories(res.length)
    })
  }, [])

  const handleAddOrUpdateCategory = (name, description, idEdit = null) => {
    if (idEdit) {
      toast
        .promise(updateCategoryAPI({ name, description }, idEdit), {
          pending: 'Updating category...',
        })
        .then((res) => {
          setCategories((prev) =>
            prev.map((category) => {
              if (category._id == idEdit) category = res
              return category
            }),
          )
          toast.success('Cập nhật thành công')
        })
    } else {
      toast
        .promise(createCategoryAPI({ name, description }), {
          pending: 'Creating category...',
        })
        .then((res) => {
          setCategories((prev) => [res, ...prev])
          toast.success('Thêm mới thành công')
        })
    }
  }

  const handleOpenModalEdit = (category) => {
    setEditingCategory(category)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm('Sếp chắc chứ?')) {
      toast
        .promise(deleteCategoryAPI(id), {
          pending: 'Deleting category...',
        })
        .then(() => {
          setCategories(categories.filter((category) => category._id !== id))
          toast.success('Xóa thành công')
        })
    }
  }

  const getCategoryColor = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="category-manager  mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý danh mục</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm danh mục
        </button>
      </div>
      {showModal && (
        <AddOrUpdateCategoryModal
          onClose={() => {
            setShowModal(false)
            if (editingCategory) setEditingCategory(null)
          }}
          onSubmit={handleAddOrUpdateCategory}
          categoryEdit={editingCategory}
        />
      )}

      {/* Statistics Card */}
      <div className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Tag className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Tổng số danh mục</p>
              <p className="text-3xl font-bold text-gray-800">{totalCategories}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {/* <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên danh mục hoặc mô tả..."
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div> */}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tên danh mục</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category, index) => (
                <tr key={category._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 ${getCategoryColor(
                          index,
                        )} rounded-full flex items-center justify-center mr-3`}
                      >
                        <Tag className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-lg">
                      <p className="line-clamp-2" title={category.description}>
                        {category.description.length > 120
                          ? `${category.description.substring(0, 120)}...`
                          : category.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1.5 border border-gray-300 rounded-md text-green-600 hover:text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleOpenModalEdit(category)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-1.5 border border-gray-300 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Chưa có danh mục nào trong hệ thống</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryManager
