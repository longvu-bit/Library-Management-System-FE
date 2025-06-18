'use client'

import { useState, useEffect } from 'react'
import {
  BookOpen,
  User,
  Calendar,
  Package,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  Send,
  Edit3,
} from 'lucide-react'

import {
  createBorrowBooksClientAPI,
  deleteCartItemClientAPI,
  fetchAllCartByUserClientAPI,
  updateQuantityCartItemClientAPI,
} from '../apis/client'
import { useForm } from 'react-hook-form'
import { formatDate } from '../utils/formatters'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const BookCart = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [cartItems, setCartItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showBorrowForm, setShowBorrowForm] = useState(false)
  const [availableItems, setAvailableItems] = useState([])

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true)
      await fetchAllCartByUserClientAPI(userInfo._id).then((res) => {
        setCartItems(res)
        setAvailableItems(res.filter((item) => item.book.available >= item.quantity))
      })
      setIsLoading(false)
    }

    fetchCartItems()
  }, [userInfo._id])

  const unavailableItems = cartItems.filter((item) => item.book.available < item.quantity)

  const toggleSelectItem = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i._id === item._id)

      if (exists) {
        return prev.filter((i) => i._id !== item._id)
      } else {
        return [...prev, item]
      }
    })
  }

  const toggleSelectAll = () => {
    setSelectedItems([...availableItems])
  }

  const deselectAll = () => {
    setSelectedItems([])
  }

  const handleBorrowBooks = async (data) => {
    const booksBorrow = []
    const booksId = []

    selectedItems.forEach((book) => {
      const addBook = { book: book.book._id, quantity: book.quantity, dueDate: data.dueDate }
      booksBorrow.push(addBook)

      booksId.push(book.book._id)
    })

    console.log(booksBorrow)

    toast
      .promise(createBorrowBooksClientAPI({ booksBorrow }), {
        pending: 'Borrowing ...',
      })
      .then(() => {
        setAvailableItems((prev) => prev.filter((item) => !booksId.includes(item.book._id)))
        navigate('/books/history')
        toast.success('Đăng ký mượn sách thành công')
      })
  }
  console.log(availableItems)

  const handleUpdateQuantity = async (cartId, type) => {
    toast
      .promise(updateQuantityCartItemClientAPI(cartId, type), {
        pending: 'Updating quantity...',
      })
      .then((res) => {
        setAvailableItems((prev) =>
          prev.map((item) => {
            if (item._id === res._id) return (item = res)
            return item
          }),
        )
        toast.success('Cập nhật số lượng thành công')
      })
  }

  const handleDeleteItemInCarts = (cartId) => {
    toast
      .promise(deleteCartItemClientAPI(cartId), {
        pending: 'Deleting cart item...',
      })
      .then(() => {
        setAvailableItems((prev) => prev.filter((item) => item._id != cartId))
        toast.success('Xóa thành công')
      })
  }

  if (isLoading && cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải giỏ sách...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center">Giỏ sách trống</h2>
          <p className="text-gray-600 text-lg text-center mb-6">
            Bạn chưa thêm sách nào vào giỏ sách để mượn.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-3">
          <ShoppingCart className="h-10 w-10 text-blue-600" />
          Giỏ sách
        </h1>
        <p className="text-gray-600 text-xl text-center">
          Bạn có {cartItems.length} cuốn sách trong giỏ sách
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Available Items */}
            {availableItems.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Sách có sẵn ({availableItems.length})
                    </h2>
                  </div>

                  {/* Select All / Deselect All */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleSelectAll}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Chọn tất cả
                    </button>
                    <button
                      onClick={deselectAll}
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Bỏ chọn tất cả
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {console.log(availableItems)}
                  {availableItems.map((item) => (
                    <div
                      key={item._id}
                      className={`bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200`}
                    >
                      <div className="flex gap-4">
                        {/* Checkbox */}

                        <div className="flex-shrink-0 flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedItems?.some((i) => i._id == item._id) || false}
                            onChange={() => toggleSelectItem(item)}
                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        {/* Book Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.book.image[0] || '/placeholder.svg?height=120&width=80'}
                            alt={item.book.title}
                            className="w-20 h-28 object-cover rounded-lg shadow-md"
                          />
                        </div>
                        {/* Book Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {item.book.title}
                          </h3>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>
                                {typeof item.book.author === 'string'
                                  ? item.book.author
                                  : item.book.author?.name || 'Unknown Author'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Năm {item.book.publishedYear}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="h-4 w-4" />
                              <span>{item.book.category.name}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Còn {item.book.available} cuốn
                            </span>
                            <span className="text-xs text-gray-500">
                              Thêm vào giỏ: {formatDate(item.createdAt)}
                            </span>
                          </div>

                          {/* Return Date */}
                          <div className="flex items-center gap-2 mb-3">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-600">
                              Dự kiến trả: {formatDate(item.requestedReturnDate)}
                            </span>
                            {/* <input
                              type="date"
                              value={item.requestedReturnDate?.split('T')[0] || ''}
                              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            /> */}
                          </div>
                        </div>
                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-3">
                          <button
                            onClick={() => handleDeleteItemInCarts(item._id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item._id, 'decrease')}
                              disabled={item.quantity == 1}
                              className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-2 font-medium min-w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item._id, 'increase')}
                              disabled={item.quantity == 3}
                              className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <span className="text-xs text-gray-500">
                            Tối đa: {item.book.available >= 3 ? '3' : item.book.available}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unavailable Items */}
            {unavailableItems.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Sách không có sẵn ({unavailableItems.length})
                  </h2>
                </div>

                <div className="space-y-4">
                  {unavailableItems.map((item) => (
                    <div key={item._id} className="bg-white rounded-2xl shadow-lg p-6 opacity-75">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.book.image[0] || '/placeholder.svg?height=120&width=80'}
                            alt={item.book.title}
                            className="w-20 h-28 object-cover rounded-lg shadow-md grayscale"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {item.book.title}
                          </h3>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                              {item.book.available === 0
                                ? 'Hết sách'
                                : `Chỉ còn ${item.book.available} cuốn`}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600">
                            Bạn muốn mượn {item.quantity} cuốn nhưng chỉ còn {item.book.available}{' '}
                            cuốn có sẵn.
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <button className="text-red-600 hover:text-red-700 p-1">
                            <Trash2 className="h-4 w-4" />
                          </button>

                          {item.book.available > 0 && (
                            <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                              Điều chỉnh
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tóm tắt đơn mượn</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng số đầu sách đã chọn:</span>
                    <span className="font-medium">{selectedItems.length} cuốn</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Có sẵn và đã chọn:</span>
                    <span className="font-medium text-green-600">{selectedItems.length} cuốn</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng số lượng sách trong giỏ:</span>
                    <span className="font-medium text-gray-600">
                      {availableItems.reduce((total, item) => total + item.quantity, 0)} cuốn
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Có thể mượn:</span>
                    <span className="text-blue-600">
                      {availableItems.length}
                      cuốn
                    </span>
                  </div>
                </div>
              </div>

              {/* Borrow Form */}

              <button
                onClick={() => setShowBorrowForm(true)}
                disabled={selectedItems.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
                Đăng ký mượn
              </button>

              <div
                className={`bg-white rounded-2xl shadow-lg p-6 ${
                  showBorrowForm ? 'block' : ' hidden'
                } `}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Thông tin mượn sách</h3>
                  <button
                    onClick={() => setShowBorrowForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(handleBorrowBooks)}>
                  {/* Return Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Ngày trả sách <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('dueDate', {
                        required: 'Vui long chon ngay tra sach',
                        validate: (value) => {
                          const now = new Date()
                          const dueDate = new Date(value)
                          const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000

                          if (dueDate <= now || dueDate - now > THIRTY_DAYS_IN_MS)
                            return 'Vui long chon ngay trong tuong lai 30 ngay toi'
                          return true
                        },
                      })}
                      type="date"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 'border-gray-300'
                        `}
                    />
                    {errors.dueDate && <p className="text-red-700">{errors.dueDate.message}</p>}

                    <p className="text-xs text-gray-500 mt-1">Thời gian mượn tối đa: 30 ngày</p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || availableItems.length === 0}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Xác nhận mượn {selectedItems.length} sách
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Help Text */}
              <div className="bg-blue-50 rounded-xl p-4 mt-6">
                <h4 className="font-medium text-blue-900 mb-2">Lưu ý:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Mỗi lần mượn tối đa 3 cuốn/đầu sách</li>
                  <li>• Thời gian mượn tối đa 30 ngày</li>
                  <li>• Vui lòng đến thư viện để nhận sách</li>
                  <li>• Trả sách đúng hạn để tránh phạt</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCart
