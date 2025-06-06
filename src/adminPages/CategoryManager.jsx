'use client'

import { useState } from 'react'
import { Search, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown, Plus, Tag, Eye } from 'lucide-react'

const CategoryManager = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Lập trình',
      description:
        'Sách về các ngôn ngữ lập trình, framework và công nghệ phần mềm. Bao gồm JavaScript, Python, Java, React, Node.js và nhiều công nghệ khác.',
    },
    {
      id: 2,
      name: 'Phát triển bản thân',
      description:
        'Sách giúp cải thiện kỹ năng cá nhân, phát triển tư duy tích cực và đạt được thành công trong cuộc sống và công việc.',
    },
    {
      id: 3,
      name: 'Thiết kế',
      description:
        'Sách về thiết kế đồ họa, UI/UX, thiết kế web và các nguyên tắc thiết kế hiện đại. Phù hợp cho designer và developer.',
    },
    {
      id: 4,
      name: 'Kinh doanh',
      description:
        'Sách về quản trị kinh doanh, khởi nghiệp, marketing, tài chính và các chiến lược phát triển doanh nghiệp thành công.',
    },
    {
      id: 5,
      name: 'Khoa học',
      description:
        'Sách về các lĩnh vực khoa học như vật lý, hóa học, sinh học, toán học và các khám phá khoa học mới nhất.',
    },
    {
      id: 6,
      name: 'Văn học',
      description:
        'Tiểu thuyết, truyện ngắn, thơ ca và các tác phẩm văn học kinh điển cũng như hiện đại của các tác giả trong và ngoài nước.',
    },
    {
      id: 7,
      name: 'Lịch sử',
      description:
        'Sách về lịch sử thế giới, lịch sử Việt Nam, các sự kiện lịch sử quan trọng và nhân vật lịch sử nổi tiếng.',
    },
    {
      id: 8,
      name: 'Tâm lý học',
      description:
        'Sách về tâm lý học ứng dụng, tâm lý học xã hội, phát triển tâm lý và các nghiên cứu về hành vi con người.',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState(null)
  const [sortField, setSortField] = useState('name')

  const handleEdit = (id) => {
    console.log('Edit category:', id)
    // Implement edit functionality
  }

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  const handleView = (id) => {
    console.log('View category details:', id)
    // Implement view details functionality
  }

  const handleAddCategory = () => {
    console.log('Add new category')
    // Implement add category functionality
  }

  const filteredAndSortedCategories = categories
    .filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortOrder) return 0

      const valueA = a[sortField].toLowerCase()
      const valueB = b[sortField].toLowerCase()

      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    })

  const handleSort = (field) => {
    if (sortField === field) {
      if (sortOrder === null || sortOrder === 'desc') {
        setSortOrder('asc')
      } else {
        setSortOrder('desc')
      }
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    if (sortOrder === 'asc') return <ArrowUp className="h-4 w-4" />
    if (sortOrder === 'desc') return <ArrowDown className="h-4 w-4" />
    return <ArrowUpDown className="h-4 w-4" />
  }

  const totalCategories = categories.length

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
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="category-manager  mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý danh mục</h1>
        <button
          onClick={handleAddCategory}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm danh mục
        </button>
      </div>

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
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên danh mục hoặc mô tả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

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
                    <button
                      onClick={() => handleSort('name')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon('name')}
                    </button>
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
              {filteredAndSortedCategories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{category.id}</div>
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
                        onClick={() => handleView(category.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-green-600 hover:text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(category.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
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

        {filteredAndSortedCategories.length === 0 && (
          <div className="text-center py-12">
            <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? 'Không tìm thấy danh mục phù hợp'
                : 'Chưa có danh mục nào trong hệ thống'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {filteredAndSortedCategories.length} / {categories.length} danh mục
      </div>
    </div>
  )
}

export default CategoryManager
