'use client'

import { useState } from 'react'
import {
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  Plus,
  Book,
  Eye,
} from 'lucide-react'

const BookManager = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'Lập trình JavaScript từ cơ bản đến nâng cao',
      author: 'Nguyễn Văn A',
      category: 'programming',
      isbn: '978-0-123456-78-9',
      quantity: 15,
      available: 12,
      status: 'available',
      addedDate: '2024-01-15',
      publisher: 'NXB Giáo dục',
      pages: 450,
    },
    {
      id: 2,
      title: 'React và Next.js - Xây dựng ứng dụng web hiện đại',
      author: 'Trần Thị B',
      category: 'programming',
      isbn: '978-0-987654-32-1',
      quantity: 8,
      available: 5,
      status: 'available',
      addedDate: '2024-01-10',
      publisher: 'NXB Công nghệ',
      pages: 380,
    },
    {
      id: 3,
      title: 'Tôi tài giỏi, bạn cũng thế',
      author: 'Adam Khoo',
      category: 'self-help',
      isbn: '978-0-456789-12-3',
      quantity: 20,
      available: 18,
      status: 'available',
      addedDate: '2024-01-20',
      publisher: 'NXB Trẻ',
      pages: 320,
    },
    {
      id: 4,
      title: 'Cơ sở dữ liệu MySQL',
      author: 'Phạm Văn C',
      category: 'programming',
      isbn: '978-0-741852-96-3',
      quantity: 5,
      available: 0,
      status: 'out-of-stock',
      addedDate: '2024-01-12',
      publisher: 'NXB Đại học',
      pages: 280,
    },
    {
      id: 5,
      title: 'Đắc Nhân Tâm',
      author: 'Dale Carnegie',
      category: 'self-help',
      isbn: '978-0-159753-48-6',
      quantity: 25,
      available: 20,
      status: 'available',
      addedDate: '2024-01-05',
      publisher: 'NXB Tổng hợp',
      pages: 350,
    },
    {
      id: 6,
      title: 'Thiết kế UI/UX cho người mới bắt đầu',
      author: 'Lê Thị D',
      category: 'design',
      isbn: '978-0-852741-96-3',
      quantity: 10,
      available: 8,
      status: 'maintenance',
      addedDate: '2024-01-08',
      publisher: 'NXB Mỹ thuật',
      pages: 420,
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState(null)
  const [sortField, setSortField] = useState('addedDate')
  const [openDropdown, setOpenDropdown] = useState(null)
  const [dropdownType, setDropdownType] = useState(null)

  const handleEdit = (id) => {
    console.log('Edit book:', id)
    // Implement edit functionality
  }

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  const handleView = (id) => {
    console.log('View book details:', id)
    // Implement view details functionality
  }

  const handleAddBook = () => {
    console.log('Add new book')
    // Implement add book functionality
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const filteredAndSortedBooks = books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm) ||
        book.publisher.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortOrder) return 0

      let valueA, valueB
      if (sortField === 'addedDate') {
        valueA = new Date(a.addedDate).getTime()
        valueB = new Date(b.addedDate).getTime()
      } else if (sortField === 'quantity' || sortField === 'available' || sortField === 'pages') {
        valueA = a[sortField]
        valueB = b[sortField]
      } else {
        valueA = a[sortField].toLowerCase()
        valueB = b[sortField].toLowerCase()
      }

      if (typeof valueA === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
      } else if (sortField === 'addedDate') {
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

  const handleCategoryChange = (bookId, newCategory) => {
    setBooks(books.map((book) => (book.id === bookId ? { ...book, category: newCategory } : book)))
    setOpenDropdown(null)
    setDropdownType(null)
  }

  const handleStatusChange = (bookId, newStatus) => {
    setBooks(books.map((book) => (book.id === bookId ? { ...book, status: newStatus } : book)))
    setOpenDropdown(null)
    setDropdownType(null)
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    if (sortOrder === 'asc') return <ArrowUp className="h-4 w-4" />
    if (sortOrder === 'desc') return <ArrowDown className="h-4 w-4" />
    return <ArrowUpDown className="h-4 w-4" />
  }

  const toggleDropdown = (id, type) => {
    if (openDropdown === id && dropdownType === type) {
      setOpenDropdown(null)
      setDropdownType(null)
    } else {
      setOpenDropdown(id)
      setDropdownType(type)
    }
  }

  const getCategoryLabel = (category) => {
    const categoryConfig = {
      programming: { label: 'Lập trình', color: 'bg-blue-500' },
      'self-help': { label: 'Phát triển bản thân', color: 'bg-green-500' },
      design: { label: 'Thiết kế', color: 'bg-purple-500' },
      science: { label: 'Khoa học', color: 'bg-orange-500' },
      literature: { label: 'Văn học', color: 'bg-pink-500' },
      business: { label: 'Kinh doanh', color: 'bg-yellow-500' },
    }
    const config = categoryConfig[category] || { label: category, color: 'bg-gray-500' }
    return (
      <span className="flex items-center">
        <span className={`w-2 h-2 ${config.color} rounded-full mr-2`}></span>
        {config.label}
      </span>
    )
  }

  const getStatusLabel = (status) => {
    const statusConfig = {
      available: { label: 'Có sẵn', color: 'bg-green-500' },
      'out-of-stock': { label: 'Hết sách', color: 'bg-red-500' },
      maintenance: { label: 'Bảo trì', color: 'bg-yellow-500' },
      discontinued: { label: 'Ngừng phát hành', color: 'bg-gray-500' },
    }
    const config = statusConfig[status] || { label: status, color: 'bg-gray-500' }
    return (
      <span className="flex items-center">
        <span className={`w-2 h-2 ${config.color} rounded-full mr-2`}></span>
        {config.label}
      </span>
    )
  }

  const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0)
  const availableBooks = books.reduce((sum, book) => sum + book.available, 0)
  const borrowedBooks = totalBooks - availableBooks

  return (
    <div className="book-manager  mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý sách</h1>
        <button
          onClick={handleAddBook}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm sách mới
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Tổng số sách</p>
              <p className="text-2xl font-bold text-gray-800">{totalBooks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">{availableBooks}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Có sẵn</p>
              <p className="text-2xl font-bold text-gray-800">{availableBooks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">{borrowedBooks}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Đang mượn</p>
              <p className="text-2xl font-bold text-gray-800">{borrowedBooks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">{books.length}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Đầu sách</p>
              <p className="text-2xl font-bold text-gray-800">{books.length}</p>
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
            placeholder="Tìm kiếm theo tên sách, tác giả, ISBN hoặc NXB..."
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
                    <span>Tên sách</span>
                    <button
                      onClick={() => handleSort('title')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon('title')}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tác giả</span>
                    <button
                      onClick={() => handleSort('author')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon('author')}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thể loại
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISBN
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Số lượng</span>
                    <button
                      onClick={() => handleSort('quantity')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon('quantity')}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
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
              {filteredAndSortedBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{book.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-xs" title={book.title}>
                      {book.title.length > 50 ? `${book.title.substring(0, 50)}...` : book.title}
                    </div>
                    <div className="text-xs text-gray-500">{book.publisher}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(book.id, 'category')}
                        className="flex items-center justify-between w-40 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {getCategoryLabel(book.category)}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </button>

                      {openDropdown === book.id && dropdownType === 'category' && (
                        <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleCategoryChange(book.id, 'programming')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Lập trình
                            </button>
                            <button
                              onClick={() => handleCategoryChange(book.id, 'self-help')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Phát triển bản thân
                            </button>
                            <button
                              onClick={() => handleCategoryChange(book.id, 'design')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                              Thiết kế
                            </button>
                            <button
                              onClick={() => handleCategoryChange(book.id, 'science')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                              Khoa học
                            </button>
                            <button
                              onClick={() => handleCategoryChange(book.id, 'literature')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                              Văn học
                            </button>
                            <button
                              onClick={() => handleCategoryChange(book.id, 'business')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                              Kinh doanh
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">{book.isbn}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <span className="font-medium">{book.available}</span>
                      <span className="text-gray-500">/{book.quantity}</span>
                    </div>
                    <div className="text-xs text-gray-500">Có sẵn/Tổng</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(book.id, 'status')}
                        className="flex items-center justify-between w-36 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {getStatusLabel(book.status)}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </button>

                      {openDropdown === book.id && dropdownType === 'status' && (
                        <div className="absolute z-10 mt-1 w-44 bg-white rounded-md shadow-lg border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleStatusChange(book.id, 'available')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Có sẵn
                            </button>
                            <button
                              onClick={() => handleStatusChange(book.id, 'out-of-stock')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Hết sách
                            </button>
                            <button
                              onClick={() => handleStatusChange(book.id, 'maintenance')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                              Bảo trì
                            </button>
                            <button
                              onClick={() => handleStatusChange(book.id, 'discontinued')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                              Ngừng phát hành
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(book.addedDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(book.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-green-600 hover:text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(book.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
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

        {filteredAndSortedBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'Không tìm thấy sách phù hợp' : 'Chưa có sách nào trong thư viện'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {filteredAndSortedBooks.length} / {books.length} đầu sách
      </div>
    </div>
  )
}

export default BookManager
