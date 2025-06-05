import { useParams } from 'react-router'
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

const DetailBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="container">
      <section className="mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-2">Tên sách: Sách mẫu</h2>
        <div className="flex items-center bg-gray-100 p-6 rounded-lg shadow-md gap-10">
          <img
            src={`https://picsum.photos/200?random=${id}`}
            alt="Book Cover"
            className="w-80 h-full object-cover p-6 rounded-lg shadow-md"
          />

          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-semibold mb-2">Tên sách: Sách mẫu</h2>
            <p className="text-gray-700 mb-4">Tác giả: Tác giả mẫu</p>
            <p className="text-gray-600 mb-4">
              Mô tả: Đây là mô tả chi tiết về cuốn sách. Nó cung cấp thông tin về nội dung, thể loại
              và các chi tiết khác.
            </p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={() => navigate(`/books/borrow/${id}`)}
            >
              Mượn sách
            </button>
          </div>
        </div>
      </section>
      {/* sách liên quan */}
      <h2 className="text-bold">Sách liên quan</h2>
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
  )
}

export default DetailBook
