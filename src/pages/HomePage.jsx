'use client'

import { useEffect, useState } from 'react'
import {
  Search,
  Filter,
  BookOpen,
  User,
  Heart,
  Star,
  ArrowRight,
  Calendar,
  Package,
  ShoppingCartIcon,
} from 'lucide-react'
import { Link } from 'react-router'
import { fetchAllBooksClientAPI } from '../apis/client'
import { useNavigate, useLocation } from 'react-router'
import { debouncedSearch } from '../customHook/debounceSearch'
import Pagination from '../components/Pagination'
import ButtonBorrow from '../components/ButtonBorrow'

const HomePage = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  const navigate = useNavigate()

  const [books, setBooks] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  const [searchBook, setSearchBook] = useState('')
  const debouncedBookSearch = debouncedSearch(searchBook, 500)

  useEffect(() => {
    navigate(`/books?page=1&search=${debouncedBookSearch}`)
  }, [navigate, debouncedBookSearch])

  useEffect(() => {
    fetchAllBooksClientAPI(location.search).then((res) => {
      setBooks(res.books)
      setTotalPages(res.totalPages)
    })
  }, [page, location.search])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Banner */}
      <div className="relative h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Khám Phá Thế Giới
              <span className="block text-yellow-300">Tri Thức</span>
            </h1>
            <p className="text-xl mb-6 text-blue-100">
              Hàng nghìn cuốn sách đang chờ bạn khám phá. Đọc sách mọi lúc, mọi nơi.
            </p>
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <BookOpen className="h-5 w-5" />
              Bắt Đầu Đọc Ngay
            </button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <BookOpen size={120} className="text-white" />
        </div>
        <div className="absolute bottom-10 right-32 opacity-10">
          <Star size={80} className="text-yellow-300" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Tìm kiếm sách theo tên"
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-full outline-none transition-colors"
              />
            </div>

            {/* Category Filters
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="text-gray-500 h-5 w-5" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2 font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-2 border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div> */}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Tất Cả Sách</h2>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden rounded-lg"
            >
              {/* Book Image */}
              <div className="relative overflow-hidden">
                <Link to={`/books/details/${book._id}`}>
                  <img
                    src={book.image[0] || '/placeholder.svg?height=300&width=200'}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  />
                </Link>

                {/* Availability Badge */}
                <div
                  className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium text-white ${
                    book.available > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {book.available > 0 ? `Còn ${book.available}` : 'Hết sách'}
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {book.category.name}
                </div>
              </div>

              {/* Book Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors">
                  {book.title.length > 15 ? `${book.title.substring(0, 15)}...` : book.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-2">
                  <User className="h-4 w-4 mr-1" />
                  <span className="text-sm">{book.author.name}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">Năm {book.publishedYear}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Package className="h-4 w-4 mr-1" />
                  <span className="text-sm">{book.publisher.name}</span>
                </div>

                {/* Action Buttons */}
                <ButtonBorrow currentBook={book} />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {books.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy sách nào</h3>
            <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
          </div>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} href={'books'} />
    </main>
  )
}

export default HomePage
