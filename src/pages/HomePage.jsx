'use client'

import { useState } from 'react'
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
} from 'lucide-react'
import { Link } from 'react-router'

const books = [
  {
    _id: '6846e8a48efd7f63d18e7d88',
    title: 'quyen hero',
    image: ['https://picsum.photos/200?random=3'],
    description: 'quyen hero',
    author: {
      _id: '6841b24d002045820a23b382',
      name: 'quyen bv ',
      bio: 'quyen bv',
      dateOfBirth: '2000-02-03T00:00:00.000Z',
      createdAt: '2025-06-05T15:05:49.419Z',
      updatedAt: '2025-06-08T15:34:05.013Z',
    },
    publisher: {
      _id: '665e20a2f3e1a0c3e0d1a102',
      name: 'NXB Kim Đồng',
      address: '55 Quang Trung, Hà Nội',
      phone: '02439381564',
      email: 'info@nxbkimdong.vn',
      website: 'https://nxbkimdong.vn',
    },
    category: {
      _id: '6842b8f8cfde884fb52cef48',
      name: 'Chưa phân loại',
      description: 'Danh mục cho các sách không rõ thể loại',
      createdAt: '2025-06-06T09:46:32.278Z',
      updatedAt: '2025-06-06T09:46:32.278Z',
    },
    quantity: 23,
    available: 10,
    publishedYear: 2024,
    createdAt: '2025-06-09T13:59:00.252Z',
    updatedAt: '2025-06-09T14:07:02.345Z',
  },
  {
    _id: '6846e976a05a8ff530d0bf35',
    title: 'new book',
    image: ['https://picsum.photos/200?random=4'],
    description: 'new',
    author: {
      _id: '6841b24d002045820a23b382',
      name: 'quyen bv ',
      bio: 'quyen bv',
      dateOfBirth: '2000-02-03T00:00:00.000Z',
      createdAt: '2025-06-05T15:05:49.419Z',
      updatedAt: '2025-06-08T15:34:05.013Z',
    },
    publisher: {
      _id: '665e20a2f3e1a0c3e0d1a101',
      name: 'NXB Trẻ',
      address: '161B Lý Chính Thắng, Q.3, TP.HCM',
      phone: '02838430089',
      email: 'contact@nxbtre.vn',
      website: 'https://nxbtre.com.vn',
    },
    category: {
      _id: '665e10a2f3e1a0c3e0d1a002',
      name: 'Thiếu nhi',
      description: 'Sách cho trẻ em và tuổi nhỏ.',
    },
    quantity: 23,
    available: 12,
    publishedYear: 2000,
    createdAt: '2025-06-09T14:02:30.109Z',
    updatedAt: '2025-06-09T14:07:14.566Z',
  },
  {
    _id: '6846ecb6a05a8ff530d0bfb6',
    title: 'Tôi tài giỏi, bạn thì chicken',
    image: ['https://picsum.photos/200?random=5'],
    description: 'sách giả',
    author: {
      _id: '6841b24d002045820a23b382',
      name: 'quyen bv ',
      bio: 'quyen bv',
      dateOfBirth: '2000-02-03T00:00:00.000Z',
      createdAt: '2025-06-05T15:05:49.419Z',
      updatedAt: '2025-06-08T15:34:05.013Z',
    },
    publisher: {
      _id: '6846685bcbacd42cff1ca1ae',
      name: 'Quyen Bui Van',
      address: 'Truc Cuong, Truc Ninh',
      phone: '0932207113',
      email: 'quyenbvph56980@fpt.edu.vn',
      website: 'https://www.youtube.com/',
      createdAt: '2025-06-09T04:51:39.305Z',
      updatedAt: '2025-06-09T04:51:39.305Z',
    },
    category: {
      _id: '6842b8f8cfde884fb52cef48',
      name: 'Chưa phân loại',
      description: 'Danh mục cho các sách không rõ thể loại',
      createdAt: '2025-06-06T09:46:32.278Z',
      updatedAt: '2025-06-06T09:46:32.278Z',
    },
    quantity: 23,
    available: 12,
    publishedYear: 2025,
    createdAt: '2025-06-09T14:16:22.867Z',
    updatedAt: '2025-06-09T14:16:22.867Z',
  },
  {
    _id: '665e40a2f3e1a0c3e0d1a302',
    title: 'Dế Mèn Phiêu Lưu Ký',
    image: ['https://picsum.photos/200?random=2'],
    description: 'Truyện thiếu nhi nổi tiếng.',
    author: {
      _id: '665e30a2f3e1a0c3e0d1a202',
      name: 'Tô Hoài',
      bio: 'Nhà văn Việt Nam với nhiều tác phẩm thiếu nhi nổi tiếng.',
      dateOfBirth: '1920-09-27T00:00:00.000Z',
    },
    publisher: {
      _id: '665e20a2f3e1a0c3e0d1a102',
      name: 'NXB Kim Đồng',
      address: '55 Quang Trung, Hà Nội',
      phone: '02439381564',
      email: 'info@nxbkimdong.vn',
      website: 'https://nxbkimdong.vn',
    },
    category: {
      _id: '665e10a2f3e1a0c3e0d1a002',
      name: 'Thiếu nhi',
      description: 'Sách cho trẻ em và tuổi nhỏ.',
    },
    quantity: 20,
    available: 15,
    publishedYear: 2002,
    updatedAt: '2025-06-09T14:06:58.175Z',
  },
  {
    _id: '6846ecf1a05a8ff530d0bfbf',
    title: 'Code lỏ',
    image: ['https://picsum.photos/200?random=6'],
    description: 'sách giả',
    author: {
      _id: '6841b24d002045820a23b382',
      name: 'quyen bv ',
      bio: 'quyen bv',
      dateOfBirth: '2000-02-03T00:00:00.000Z',
      createdAt: '2025-06-05T15:05:49.419Z',
      updatedAt: '2025-06-08T15:34:05.013Z',
    },
    publisher: {
      _id: '6846685bcbacd42cff1ca1ae',
      name: 'Quyen Bui Van',
      address: 'Truc Cuong, Truc Ninh',
      phone: '0932207113',
      email: 'quyenbvph56980@fpt.edu.vn',
      website: 'https://www.youtube.com/',
      createdAt: '2025-06-09T04:51:39.305Z',
      updatedAt: '2025-06-09T04:51:39.305Z',
    },
    category: {
      _id: '6842b8f8cfde884fb52cef48',
      name: 'Chưa phân loại',
      description: 'Danh mục cho các sách không rõ thể loại',
      createdAt: '2025-06-06T09:46:32.278Z',
      updatedAt: '2025-06-06T09:46:32.278Z',
    },
    quantity: 23,
    available: 12,
    publishedYear: 2025,
    createdAt: '2025-06-09T14:17:21.982Z',
    updatedAt: '2025-06-09T14:17:21.982Z',
  },
  {
    _id: '665e40a2f3e1a0c3e0d1a301',
    title: 'Clean Code edit',
    image: ['https://picsum.photos/200?random=1'],
    description: 'Cẩm nang lập trình sạch từ Uncle Bob.',
    author: {
      _id: '6841b24d002045820a23b382',
      name: 'quyen bv ',
      bio: 'quyen bv',
      dateOfBirth: '2000-02-03T00:00:00.000Z',
      createdAt: '2025-06-05T15:05:49.419Z',
      updatedAt: '2025-06-08T15:34:05.013Z',
    },
    publisher: {
      _id: '665e20a2f3e1a0c3e0d1a102',
      name: 'NXB Kim Đồng',
      address: '55 Quang Trung, Hà Nội',
      phone: '02439381564',
      email: 'info@nxbkimdong.vn',
      website: 'https://nxbkimdong.vn',
    },
    category: {
      _id: '6842b8f8cfde884fb52cef48',
      name: 'Chưa phân loại',
      description: 'Danh mục cho các sách không rõ thể loại',
      createdAt: '2025-06-06T09:46:32.278Z',
      updatedAt: '2025-06-06T09:46:32.278Z',
    },
    quantity: 10,
    available: 10,
    publishedYear: 2008,
    updatedAt: '2025-06-09T14:06:50.634Z',
  },
  {
    _id: '6846ed631dfbe933a4decd5a',
    title: 'Book 03',
    image: ['https://picsum.photos/200?random=9'],
    description: 'Book 03',
    author: {
      _id: '6841b24d002045820a23b382',
      name: 'quyen bv ',
      bio: 'quyen bv',
      dateOfBirth: '2000-02-03T00:00:00.000Z',
      createdAt: '2025-06-05T15:05:49.419Z',
      updatedAt: '2025-06-08T15:34:05.013Z',
    },
    publisher: {
      _id: '6846685bcbacd42cff1ca1ae',
      name: 'Quyen Bui Van',
      address: 'Truc Cuong, Truc Ninh',
      phone: '0932207113',
      email: 'quyenbvph56980@fpt.edu.vn',
      website: 'https://www.youtube.com/',
      createdAt: '2025-06-09T04:51:39.305Z',
      updatedAt: '2025-06-09T04:51:39.305Z',
    },
    category: {
      _id: '6842b8f8cfde884fb52cef48',
      name: 'Chưa phân loại',
      description: 'Danh mục cho các sách không rõ thể loại',
      createdAt: '2025-06-06T09:46:32.278Z',
      updatedAt: '2025-06-06T09:46:32.278Z',
    },
    quantity: 23,
    available: 11,
    publishedYear: 2025,
    createdAt: '2025-06-09T14:19:15.728Z',
    updatedAt: '2025-06-09T14:19:15.728Z',
  },
  {
    _id: '6846ed4e1dfbe933a4decd51',
    title: 'Book 02',
    image: ['https://picsum.photos/200?random=8'],
    description: 'Book 02',
    author: {
      _id: '6841b24d002045820a23b382',
      name: 'quyen bv ',
      bio: 'quyen bv',
      dateOfBirth: '2000-02-03T00:00:00.000Z',
      createdAt: '2025-06-05T15:05:49.419Z',
      updatedAt: '2025-06-08T15:34:05.013Z',
    },
    publisher: {
      _id: '6846685bcbacd42cff1ca1ae',
      name: 'Quyen Bui Van',
      address: 'Truc Cuong, Truc Ninh',
      phone: '0932207113',
      email: 'quyenbvph56980@fpt.edu.vn',
      website: 'https://www.youtube.com/',
      createdAt: '2025-06-09T04:51:39.305Z',
      updatedAt: '2025-06-09T04:51:39.305Z',
    },
    category: {
      _id: '6842b8f8cfde884fb52cef48',
      name: 'Chưa phân loại',
      description: 'Danh mục cho các sách không rõ thể loại',
      createdAt: '2025-06-06T09:46:32.278Z',
      updatedAt: '2025-06-06T09:46:32.278Z',
    },
    quantity: 23,
    available: 11,
    publishedYear: 2025,
    createdAt: '2025-06-09T14:18:54.843Z',
    updatedAt: '2025-06-09T14:18:54.843Z',
  },
]

const categories = ['Tất cả', 'Thiếu nhi', 'Chưa phân loại']

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState([])

  // Filter books based on category and search term
  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'Tất cả' || book.category.name === selectedCategory
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId],
    )
  }

  const handleBorrowBook = (bookId) => {
    console.log(`Borrowing book with ID: ${bookId}`)
    // Add your navigation logic here
    // navigate(`/books/borrow/${bookId}`)
  }

  const handleBookDetails = (bookId) => {
    console.log(`Viewing details for book with ID: ${bookId}`)
    // Add your navigation logic here
    // navigate(`/books/details/${bookId}`)
  }

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
                placeholder="Tìm kiếm sách, tác giả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-full outline-none transition-colors"
              />
            </div>

            {/* Category Filters */}
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
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {selectedCategory === 'Tất cả' ? 'Tất Cả Sách' : selectedCategory}
          </h2>
          <p className="text-gray-600 flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Tìm thấy {filteredBooks.length} cuốn sách
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
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
                    onClick={() => handleBookDetails(book._id)}
                  />
                </Link>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(book._id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      favorites.includes(book._id) ? 'text-red-500 fill-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>

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
                <h3
                  className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleBookDetails(book._id)}
                >
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
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBorrowBook(book._id)}
                    disabled={book.available === 0}
                    className={`flex-1 py-2 px-4 rounded font-medium transition-colors flex items-center justify-center gap-2 ${
                      book.available > 0
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    {book.available > 0 ? 'Mượn Sách' : 'Hết Sách'}
                  </button>

                  <button
                    onClick={() => handleBookDetails(book._id)}
                    className="px-3 py-2 border-2 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy sách nào</h3>
            <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default HomePage
