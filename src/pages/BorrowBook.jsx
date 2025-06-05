import { useNavigate, useParams } from 'react-router'

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

const BorrowBook = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const book = books.find((book) => book.id === parseInt(id))
  if (!book) {
    return (
      <div className="text-center text-red-500 min-h-190">
        Không tìm thấy sách bạn muốn mượn. Rất xin lỗi!
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-fit bg-white mt-10 mb-10 min-h-190">
      <form action="" className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl text-center font-bold mb-6">Mượn sách</h2>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold mb-2">Tên sách: {book.title}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="borrowDate" className="block text-gray-700 mb-2">
            Ngày mượn:
          </label>
          <input
            type="date"
            id="borrowDate"
            value={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-700 mb-2">
            Ngày trả dự kiến:
          </label>
          <input
            type="date"
            id="dueDate"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Mượn sách
        </button>
      </form>
      <div>
        <h2 className="font-bold text-2xl">Sách liên quan</h2>
        <div className="list-books grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
            >
              <img
                onClick={() => navigate(`/books/details/${book.id}`)}
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-t-lg"
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
      </div>
    </div>
  )
}

export default BorrowBook
