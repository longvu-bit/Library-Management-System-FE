import { useState } from 'react'
import banner from '../assets/banner-1.jpg'
import { useNavigate } from 'react-router'

const books = [
  {
    id: 1,
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    image: 'https://picsum.photos/200?random=1',
  },
  {
    id: 2,
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    image: 'https://picsum.photos/200?random=2',
  },
  {
    id: 3,
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    image: 'https://picsum.photos/200?random=3',
  },
  {
    id: 4,
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    image: 'https://picsum.photos/200?random=4',
  },
]

const categories = ['Tất cả', 'Tiểu thuyết', 'Kinh tế', 'Thiếu nhi']

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')

  const navigate = useNavigate()

  return (
    <main>
      <div className="banner">
        <img className="h-100 w-full" src={banner} alt="banner" />
      </div>
      <div className="container">
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4  w-30 h-8 border ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-100'
                } transition-colors`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="list-books grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onClick={() => navigate(`/books/details/${book.id}`)}
                />
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-600">Tác giả: {book.author}</p>

                  <button
                    className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => navigate(`/books/borrow/${book.id}`)}
                  >
                    Mượn sách
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomePage
