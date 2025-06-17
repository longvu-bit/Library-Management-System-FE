'use client'

import { useState } from 'react'
import { Search, Edit, Trash2, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react'
import { useGetList, useUpdate, useRemove } from './../../customHook/apiHooks'
import { useEffect } from 'react'
import Pagination from '../../components/Pagination'
import { Book } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { debouncedSearch } from '../../customHook/debounceSearch'
import { toast } from 'react-toastify'

const BorrowBookManager = () => {
  let [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const [totalBorrowRecords, setTotalBorrowRecords] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [order, setOrder] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')

  const debouncedUserSearch = debouncedSearch(searchTerm, 500)

  const {
    data: records,
    isLoading,
    isError,
    error,
  } = useGetList('borrows', {
    page: currentPage,
    search: debouncedUserSearch,
    sortBy: 'createdAt',
    order: order,
  })

  const { mutate: updateBorrowStatus } = useUpdate('borrows')
  const { mutate: removeBorrowRecord } = useRemove('borrows')

  useEffect(() => {
    if (records) {
      setCurrentPage(page)
      setTotalPages(records.totalPages)
      setTotalBorrowRecords(records.totalDocuments)
    }
  }, [records, page])

  const [openDropdown, setOpenDropdown] = useState(null)

  const handleDelete = (id) => {
    if (confirm('Sếp chắc chứ?')) {
      removeBorrowRecord(id)
      toast.success('Xóa thành công!')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const handleSortByDate = () => {
    if (order === 'desc') {
      setOrder('asc')
    } else {
      setOrder('desc')
    }
  }

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'borrowed':
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

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error}</div>

  return (
    <div className="history-manager  mx-auto p-6">
      <h1 className="text-3xl  font-bold mb-8 text-gray-800">
        Quản lý lịch sử mượn sách
      </h1>
      {/* Statistics Card */}
      <div className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Book className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Tổng số bản ghi mượn</p>
              <p className="text-3xl font-bold text-gray-800">{totalBorrowRecords}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên người dùng hoặc tên sách..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            />
          </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên người dùng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên sách
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Ngày mượn</span>
                    <button
                      onClick={handleSortByDate}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {order === 'asc' ? <ArrowUp /> : <ArrowDown />}
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
              {console.log(records.borrowRecords)}
              {records.borrowRecords.map((record,i) => (
                <tr key={record._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{i+1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.user?.name ?? record.userSnapshot?.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="text-sm text-gray-900 max-w-xs truncate"
                      title={record.book?.title ?? record.bookSnapshot?.title}
                    >
                      {record.book?.title ?? record.bookSnapshot?.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(record.borrowDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(record.dueDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(record._id)}
                        className="flex items-center justify-between w-40 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {getStatusLabel(record.status)}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </button>

                      {openDropdown === record._id && (
                        <div className="absolute z-10 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                updateBorrowStatus({ id: record._id, data: { status: 'borrowed' } })
                                setOpenDropdown(false)
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Đang mượn
                            </button>
                            <button
                              onClick={() => {
                                updateBorrowStatus({ id: record._id, data: { status: 'overdue' } })
                                setOpenDropdown(false)
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Quá hạn
                            </button>
                            <button
                              onClick={() => {
                                updateBorrowStatus({ id: record._id, data: { status: 'returned' } })
                                setOpenDropdown(false)
                              }}
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
                      {/* <button
                        onClick={() => handleEdit(record.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Edit className="h-4 w-4" />
                      </button> */}
                      <button
                        onClick={() => handleDelete(record._id)}
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

        {records.borrowRecords.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Không có bản ghi nào'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {records.borrowRecords.length} / {records.borrowRecords.length} bản ghi
      </div>
      <Pagination page={currentPage} href={'admin/history'} totalPages={totalPages} />
    </div>
  )
}

export default BorrowBookManager
