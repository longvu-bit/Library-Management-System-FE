const HistoryBorrowBook = () => {
  const borrowedBooks = []

  if (borrowedBooks.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center mx-auto px-4 py-8 min-h-190">
        <p className="text-black mb-6 text-3xl font-semibold text-center">
          Bạn chưa mượn sách nào!
        </p>
      </div>
    )
  }

  return (
    <div className="history-borrow-book container mx-auto px-4 py-8 min-h-190">
      <h1 className="text-2xl font-bold mb-4 text-center mt-10">Lịch sử mượn sách</h1>
      <p className="text-gray-600 mb-6 text-xl font-semibold">
        Danh sách các cuốn sách bạn đã mượn.
      </p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black uppercase tracking-wider">
                Tên sách
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black uppercase tracking-wider">
                Ngày mượn
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black uppercase tracking-wider">
                Ngày trả
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black uppercase tracking-wider">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Dữ liệu lịch sử mượn sách sẽ được hiển thị ở đây */}
            {borrowedBooks?.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {book.borrowDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {book.returnDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HistoryBorrowBook
