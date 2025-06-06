'use client'

import { useState } from 'react'
import {
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Plus,
  Users,
  Eye,
} from 'lucide-react'

const AuthorManager = () => {
  const [authors, setAuthors] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      bio: 'Tác giả chuyên về lĩnh vực công nghệ thông tin và lập trình. Có nhiều năm kinh nghiệm trong phát triển phần mềm.',
      addedDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Dale Carnegie',
      bio: "Nhà văn và diễn giả nổi tiếng về phát triển bản thân. Tác phẩm nổi tiếng nhất là 'Đắc Nhân Tâm'.",
      addedDate: '2024-01-10',
    },
    {
      id: 3,
      name: 'Trần Thị B',
      bio: 'Chuyên gia về React và phát triển web hiện đại. Tác giả của nhiều cuốn sách về JavaScript và React.',
      addedDate: '2024-01-20',
    },
    {
      id: 4,
      name: 'Adam Khoo',
      bio: 'Doanh nhân và tác giả sách về giáo dục, phát triển bản thân. Chuyên gia về kỹ năng học tập hiệu quả.',
      addedDate: '2024-01-12',
    },
    {
      id: 5,
      name: 'Lê Văn C',
      bio: 'Tác giả trẻ chuyên về thiết kế UI/UX và trải nghiệm người dùng. Có nhiều bài viết về design thinking.',
      addedDate: '2024-01-05',
    },
    {
      id: 6,
      name: 'Robert C. Martin',
      bio: "Chuyên gia về Clean Code và Software Engineering. Tác giả của 'Clean Code' và 'Clean Architecture'.",
      addedDate: '2024-01-08',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState(null)
  const [sortField, setSortField] = useState('addedDate')

  const handleEdit = (id) => {
    console.log('Edit author:', id)
    // Implement edit functionality
  }

  const handleDelete = (id) => {
    setAuthors(authors.filter((author) => author.id !== id))
  }

  const handleView = (id) => {
    console.log('View author details:', id)
    // Implement view details functionality
  }

  const handleAddAuthor = () => {
    console.log('Add new author')
    // Implement add author functionality
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const filteredAndSortedAuthors = authors
    .filter(
      (author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.bio.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortOrder) return 0

      let valueA, valueB
      if (sortField === 'addedDate') {
        valueA = new Date(a.addedDate).getTime()
        valueB = new Date(b.addedDate).getTime()
      } else {
        valueA = a[sortField].toLowerCase()
        valueB = b[sortField].toLowerCase()
      }

      if (sortField === 'addedDate') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
      } else {
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }
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

  const totalAuthors = authors.length

  return (
    <div className="author-manager  mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý tác giả</h1>
        <button
          onClick={handleAddAuthor}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm tác giả
        </button>
      </div>

      {/* Statistics Card */}
      <div className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Users className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Tổng số tác giả</p>
              <p className="text-3xl font-bold text-gray-800">{totalAuthors}</p>
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
            placeholder="Tìm kiếm theo tên tác giả hoặc tiểu sử..."
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
                    <span>Tên tác giả</span>
                    <button
                      onClick={() => handleSort('name')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon('name')}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiểu sử
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Ngày thêm</span>
                    <button
                      onClick={() => handleSort('addedDate')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon('addedDate')}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedAuthors.map((author) => (
                <tr key={author.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{author.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">
                          {author.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .substring(0, 2)}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{author.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md">
                      <p className="line-clamp-2" title={author.bio}>
                        {author.bio.length > 100
                          ? `${author.bio.substring(0, 100)}...`
                          : author.bio}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(author.addedDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(author.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-green-600 hover:text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(author.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(author.id)}
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

        {filteredAndSortedAuthors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'Không tìm thấy tác giả phù hợp' : 'Chưa có tác giả nào trong hệ thống'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {filteredAndSortedAuthors.length} / {authors.length} tác giả
      </div>
    </div>
  )
}

export default AuthorManager
