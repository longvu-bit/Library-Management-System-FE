'use client'

import { useEffect, useState } from 'react'
import {
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Plus,
  Book,
  Eye,
} from 'lucide-react'

import { useNavigate, useSearchParams } from 'react-router'
import { debouncedSearch } from '../../customHook/debounceSearch'
import { toast } from 'react-toastify'
import Pagination from '../../components/Pagination'
import { createBookAPI, deleteBookAPI, fetchAllBooksAPI, updateBookAPI } from '../../apis/admin'
import AddOrUpdateBookModal from './AddOrUpdateBookModal'

const BookManager = () => {
  const navigate = useNavigate()

  let [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const [totalDocuments, setTotalDocuments] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [books, setBooks] = useState([])

  const [searchBook, setSearchBook] = useState('')
  const debouncedBookSearch = debouncedSearch(searchBook, 500)

  const [sortBy, setSortBy] = useState('')
  const [order, setOrder] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  useEffect(() => {
    navigate(`/admin/books?page=1&search=${debouncedBookSearch}&sortBy=${sortBy}&order=${order}`)
  }, [navigate, debouncedBookSearch, sortBy, order])

  useEffect(() => {
    fetchAllBooksAPI(page, debouncedBookSearch, sortBy, order).then((res) => {
      setBooks(res.books)
      setTotalDocuments(res.totalDocuments)
      setTotalPages(res.totalPages)
    })
  }, [page, debouncedBookSearch, sortBy, order])

  const handleOpenModalEdit = (book) => {
    setShowModal(true)
    setEditingBook(book)
  }

  const handleDelete = (id) => {
    if (confirm('Sếp chắc chứ?')) {
      toast
        .promise(deleteBookAPI(id), {
          pending: 'Deleting book...',
        })
        .then(() => {
          setBooks(books.filter((book) => book._id !== id))
          toast.success('Xóa thành công')
        })
    }
  }

  const handleView = (id) => {
    console.log('View book details:', id)
    // Implement view details functionality
  }

  const handleCreateOrUpdateBook = (data, idEdit = null) => {
    if (idEdit) {
      toast.promise(updateBookAPI(data, idEdit), { pending: 'Updating book...' }).then((res) => {
        setBooks((prev) =>
          prev.map((b) => {
            if (b._id == idEdit) b = res
            return b
          }),
        )
        toast.success('Cập nhật thành công')
      })
    } else {
      toast.promise(createBookAPI(data), { pending: 'Creating book...' }).then((res) => {
        setBooks((prev) => [res, ...prev])
        toast.success('Thêm mới thành công')
      })
    }
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setOrder('desc')
    }
  }

  const availableBooks = books.reduce((sum, book) => sum + book.available, 0)
  const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0)
  const borrowedBooks = totalBooks - availableBooks

  return (
    <div className="book-manager  mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý sách</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm sách mới
        </button>
      </div>

      {showModal && (
        <AddOrUpdateBookModal
          onClose={() => {
            setShowModal(false)
            if (editingBook) setEditingBook(null)
          }}
          onSubmit={handleCreateOrUpdateBook}
          bookEdit={editingBook}
        />
      )}

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
              <span className="text-white font-bold text-sm"> {availableBooks}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Có sẵn</p>
              <p className="text-2xl font-bold text-gray-800"> {availableBooks}</p>
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
              <span className="text-white font-bold text-sm">{totalDocuments}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Đầu sách</p>
              <p className="text-2xl font-bold text-gray-800">{totalDocuments}</p>
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
            placeholder="Tìm kiếm theo tên sách..."
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
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
                  STT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tên sách</span>
                    <button
                      onClick={() => handleSort('title')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {sortBy === 'title' ? (
                        order === 'asc' ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        <ArrowUpDown />
                      )}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tác giả</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Nhà xuất bản</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thể loại
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Số lượng</span>
                    <button
                      onClick={() => handleSort('quantity')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {sortBy === 'quantity' ? (
                        order === 'asc' ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        <ArrowUpDown />
                      )}
                    </button>
                  </div>
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Năm xuất bản</span>
                    <button
                      onClick={() => handleSort('publishedYear')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {sortBy === 'publishedYear' ? (
                        order === 'asc' ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        <ArrowUpDown />
                      )}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book, index) => (
                <tr key={book._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{index + 1}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-xs" title={book.title}>
                      {book.title.length > 50 ? `${book.title.substring(0, 50)}...` : book.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.author?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.publisher?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.category?.name}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <span className="font-medium">{book.available}</span>
                      <span className="text-gray-500">/{book.quantity}</span>
                    </div>
                    <div className="text-xs text-gray-500">Có sẵn/Tổng</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.publishedYear}</div>
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
                        onClick={() => handleOpenModalEdit(book)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
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

        {books.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchBook ? 'Không tìm thấy sách phù hợp' : 'Chưa có sách nào trong thư viện'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {books.length} / {books.length} đầu sách
      </div>

      <Pagination page={page} href={'admin/books'} totalPages={totalPages} />
    </div>
  )
}

export default BookManager
