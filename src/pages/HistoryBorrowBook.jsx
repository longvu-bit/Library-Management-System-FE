'use client'

import { useState, useEffect } from 'react'
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Eye,
  RotateCcw,
  User,
  Package,
} from 'lucide-react'

// Sample data based on BorrowRecord model
const sampleBorrowRecords = [
  {
    _id: '64a1b2c3d4e5f6789012345a',
    userId: {
      _id: 'user123',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
    },
    bookId: {
      _id: '665e40a2f3e1a0c3e0d1a302',
      title: 'Dế Mèn Phiêu Lưu Ký',
      author: {
        name: 'Tô Hoài',
      },
      image: ['https://picsum.photos/200?random=2'],
      category: {
        name: 'Thiếu nhi',
      },
    },
    borrowDate: '2024-01-15T08:00:00.000Z',
    dueDate: '2024-02-14T23:59:59.000Z',
    returnDate: '2024-02-10T14:30:00.000Z',
    status: 'returned',
    createdAt: '2024-01-15T08:00:00.000Z',
    updatedAt: '2024-02-10T14:30:00.000Z',
  },
  {
    _id: '64a1b2c3d4e5f6789012345b',
    userId: {
      _id: 'user123',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
    },
    bookId: {
      _id: '665e40a2f3e1a0c3e0d1a301',
      title: 'Clean Code edit',
      author: {
        name: 'quyen bv',
      },
      image: ['https://picsum.photos/200?random=1'],
      category: {
        name: 'Chưa phân loại',
      },
    },
    borrowDate: '2024-02-01T09:15:00.000Z',
    dueDate: '2024-03-02T23:59:59.000Z',
    returnDate: null,
    status: 'borrowed',
    createdAt: '2024-02-01T09:15:00.000Z',
    updatedAt: '2024-02-01T09:15:00.000Z',
  },
  {
    _id: '64a1b2c3d4e5f6789012345c',
    userId: {
      _id: 'user123',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
    },
    bookId: {
      _id: '6846e8a48efd7f63d18e7d88',
      title: 'quyen hero',
      author: {
        name: 'quyen bv',
      },
      image: ['https://picsum.photos/200?random=3'],
      category: {
        name: 'Chưa phân loại',
      },
    },
    borrowDate: '2023-12-10T10:30:00.000Z',
    dueDate: '2024-01-09T23:59:59.000Z',
    returnDate: null,
    status: 'overdue',
    createdAt: '2023-12-10T10:30:00.000Z',
    updatedAt: '2023-12-10T10:30:00.000Z',
  },
  {
    _id: '64a1b2c3d4e5f6789012345d',
    userId: {
      _id: 'user123',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
    },
    bookId: {
      _id: '6846e976a05a8ff530d0bf35',
      title: 'new book',
      author: {
        name: 'quyen bv',
      },
      image: ['https://picsum.photos/200?random=4'],
      category: {
        name: 'Thiếu nhi',
      },
    },
    borrowDate: '2023-11-20T14:45:00.000Z',
    dueDate: '2023-12-20T23:59:59.000Z',
    returnDate: '2023-12-18T16:20:00.000Z',
    status: 'returned',
    createdAt: '2023-11-20T14:45:00.000Z',
    updatedAt: '2023-12-18T16:20:00.000Z',
  },
  {
    _id: '64a1b2c3d4e5f6789012345e',
    userId: {
      _id: 'user123',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
    },
    bookId: {
      _id: '6846ecb6a05a8ff530d0bfb6',
      title: 'Tôi tài giỏi, bạn thì chicken',
      author: {
        name: 'quyen bv',
      },
      image: ['https://picsum.photos/200?random=5'],
      category: {
        name: 'Chưa phân loại',
      },
    },
    borrowDate: '2023-10-15T11:00:00.000Z',
    dueDate: '2023-11-14T23:59:59.000Z',
    returnDate: '2023-11-12T13:15:00.000Z',
    status: 'returned',
    createdAt: '2023-10-15T11:00:00.000Z',
    updatedAt: '2023-11-12T13:15:00.000Z',
  },
]

const HistoryBorrowBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchBorrowHistory = async () => {
      setIsLoading(true)
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setBorrowedBooks(sampleBorrowRecords)
      setFilteredBooks(sampleBorrowRecords)
      setIsLoading(false)
    }

    fetchBorrowHistory()
  }, [])

  useEffect(() => {
    // Filter books based on search term and status
    const filtered = borrowedBooks.filter((record) => {
      const matchesSearch =
        record.bookId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.bookId.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter
      return matchesSearch && matchesStatus
    })

    setFilteredBooks(filtered)
  }, [searchTerm, statusFilter, borrowedBooks])

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa trả'
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const getStatusInfo = (status, dueDate) => {
    const now = new Date()
    const due = new Date(dueDate)

    switch (status) {
      case 'returned':
        return {
          label: 'Đã trả',
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
        }
      case 'borrowed':
        if (now > due) {
          return {
            label: 'Quá hạn',
            color: 'bg-red-100 text-red-800',
            icon: XCircle,
          }
        }
        return {
          label: 'Đang mượn',
          color: 'bg-blue-100 text-blue-800',
          icon: Clock,
        }
      case 'overdue':
        return {
          label: 'Quá hạn',
          color: 'bg-red-100 text-red-800',
          icon: AlertTriangle,
        }
      default:
        return {
          label: 'Không xác định',
          color: 'bg-gray-100 text-gray-800',
          icon: XCircle,
        }
    }
  }

  const getDaysRemaining = (dueDate, status) => {
    if (status === 'returned') return null

    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return `Quá hạn ${Math.abs(diffDays)} ngày`
    } else if (diffDays === 0) {
      return 'Hết hạn hôm nay'
    } else if (diffDays <= 3) {
      return `Còn ${diffDays} ngày`
    }
    return null
  }

  const handleViewBook = (bookId) => {
    console.log(`Viewing book details: ${bookId}`)
    // Navigate to book details page
  }

  const handleRenewBook = (recordId) => {
    console.log(`Renewing book: ${recordId}`)
    // Handle book renewal
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải lịch sử mượn sách...</p>
        </div>
      </div>
    )
  }

  if (borrowedBooks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center">
            Bạn chưa mượn sách nào!
          </h2>
          <p className="text-gray-600 text-lg text-center mb-6">
            Hãy khám phá thư viện và mượn những cuốn sách yêu thích của bạn.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Khám phá sách
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Lịch sử mượn sách</h1>
        <p className="text-gray-600 text-xl text-center">
          Quản lý và theo dõi các cuốn sách bạn đã mượn
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sách hoặc tác giả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition-colors"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="borrowed">Đang mượn</option>
              <option value="returned">Đã trả</option>
              <option value="overdue">Quá hạn</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{borrowedBooks.length}</div>
            <div className="text-sm text-blue-800">Tổng số lần mượn</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {borrowedBooks.filter((b) => b.status === 'returned').length}
            </div>
            <div className="text-sm text-green-800">Đã trả</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {borrowedBooks.filter((b) => b.status === 'borrowed').length}
            </div>
            <div className="text-sm text-yellow-800">Đang mượn</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {borrowedBooks.filter((b) => b.status === 'overdue').length}
            </div>
            <div className="text-sm text-red-800">Quá hạn</div>
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="space-y-4">
        {filteredBooks.map((record) => {
          const statusInfo = getStatusInfo(record.status, record.dueDate)
          const StatusIcon = statusInfo.icon
          const daysRemaining = getDaysRemaining(record.dueDate, record.status)

          return (
            <div
              key={record._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Book Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={record.bookId.image[0] || '/placeholder.svg?height=150&width=100'}
                      alt={record.bookId.title}
                      className="w-24 h-32 object-cover rounded-lg shadow-md"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {record.bookId.title}
                        </h3>

                        <div className="flex items-center gap-4 text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span className="text-sm">{record.bookId.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="h-4 w-4" />
                            <span className="text-sm">{record.bookId.category.name}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="text-gray-500">Ngày mượn</div>
                              <div className="font-medium">{formatDate(record.borrowDate)}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <div>
                              <div className="text-gray-500">Hạn trả</div>
                              <div className="font-medium">{formatDate(record.dueDate)}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <div>
                              <div className="text-gray-500">Ngày trả</div>
                              <div className="font-medium">{formatDate(record.returnDate)}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex flex-col items-end gap-3">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                        >
                          <StatusIcon className="h-4 w-4" />
                          {statusInfo.label}
                        </div>

                        {daysRemaining && (
                          <div
                            className={`text-sm px-2 py-1 rounded ${
                              daysRemaining.includes('Quá hạn')
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {daysRemaining}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewBook(record.bookId._id)}
                            className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                          >
                            <Eye className="h-4 w-4" />
                            Xem chi tiết
                          </button>

                          {record.status === 'borrowed' && (
                            <button
                              onClick={() => handleRenewBook(record._id)}
                              className="flex items-center gap-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm"
                            >
                              <RotateCcw className="h-4 w-4" />
                              Gia hạn
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State for Filtered Results */}
      {filteredBooks.length === 0 && borrowedBooks.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy kết quả</h3>
          <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái</p>
        </div>
      )}
    </div>
  )
}

export default HistoryBorrowBook
