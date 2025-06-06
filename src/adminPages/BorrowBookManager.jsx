'use client'

import { useState } from 'react'
import { Search, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react'

const BorrowBookManager = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      username: 'Nguyễn Văn A',
      bookTitle: 'Lập trình JavaScript',
      borrowDate: '2024-01-15',
      dueDate: '2024-02-15',
      status: 'active',
    },
    {
      id: 2,
      username: 'Trần Thị B',
      bookTitle: 'React và Next.js',
      borrowDate: '2024-01-10',
      dueDate: '2024-01-25',
      status: 'overdue',
    },
    {
      id: 3,
      username: 'Lê Văn C',
      bookTitle: 'Python cho người mới bắt đầu',
      borrowDate: '2024-01-20',
      dueDate: '2024-02-20',
      status: 'returned',
    },
    {
      id: 4,
      username: 'Phạm Thị D',
      bookTitle: 'Cơ sở dữ liệu MySQL',
      borrowDate: '2024-01-12',
      dueDate: '2024-02-12',
      status: 'active',
    },
    {
      id: 5,
      username: 'Hoàng Văn E',
      bookTitle: 'Thiết kế UI/UX',
      borrowDate: '2024-01-05',
      dueDate: '2024-01-20',
      status: 'overdue',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleEdit = (id) => {
    console.log('Edit record:', id)
    // Implement edit functionality
  }

  const handleDelete = (id) => {
    setRecords(records.filter((record) => record.id !== id))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const filteredAndSortedRecords = records
    .filter(
      (record) =>
        record.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortOrder) return 0
      const dateA = new Date(a.borrowDate).getTime()
      const dateB = new Date(b.borrowDate).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

  const handleSortByDate = () => {
    if (sortOrder === null || sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder('desc')
    }
  }

  const handleStatusChange = (recordId, newStatus) => {
    setRecords(
      records.map((record) => (record.id === recordId ? { ...record, status: newStatus } : record)),
    )
    setOpenDropdown(null)
  }

  const getSortIcon = () => {
    if (sortOrder === 'asc') return <ArrowUp className="h-4 w-4" />
    if (sortOrder === 'desc') return <ArrowDown className="h-4 w-4" />
    return <ArrowUpDown className="h-4 w-4" />
  }

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Đang mượn
          </span>
        )
      case 'overdue':
        return (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Quá hạn
          </span>
        )
      case 'returned':
        return (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Đã trả
          </span>
        )
      default:
        return status
    }
  }

  return (
    <div className="history-manager  mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-8 text-gray-800">
        Quản lý lịch sử mượn sách
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên người dùng hoặc tên sách..."
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
                  Tên người dùng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên sách
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Ngày mượn</span>
                    <button
                      onClick={handleSortByDate}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon()}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày hết hạn
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.username}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="text-sm text-gray-900 max-w-xs truncate"
                      title={record.bookTitle}
                    >
                      {record.bookTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(record.borrowDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(record.dueDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(record.id)}
                        className="flex items-center justify-between w-40 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {getStatusLabel(record.status)}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </button>

                      {openDropdown === record.id && (
                        <div className="absolute z-10 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleStatusChange(record.id, 'active')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Đang mượn
                            </button>
                            <button
                              onClick={() => handleStatusChange(record.id, 'overdue')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Quá hạn
                            </button>
                            <button
                              onClick={() => handleStatusChange(record.id, 'returned')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Đã trả
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(record.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
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

        {filteredAndSortedRecords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Không có bản ghi nào'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {filteredAndSortedRecords.length} / {records.length} bản ghi
      </div>
    </div>
  )
}

export default BorrowBookManager
