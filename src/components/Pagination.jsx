import { useNavigate } from 'react-router'

const Pagination = ({ page, href, totalPages }) => {
  const navigate = useNavigate()

  return (
    <div className="mt-6 flex justify-center items-center space-x-2">
      {/* Previous */}
      <button
        onClick={() => page > 1 && navigate(`/${href}?page=${page - 1}`)}
        disabled={page === 1}
        className={`px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none ${
          page === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Trước
      </button>

      {/* Page numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNum = index + 1
        return (
          <button
            key={pageNum}
            onClick={() => navigate(`/${href}?page=${pageNum}`)}
            className={`px-3 py-1 rounded-md border ${
              pageNum === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-gray-100'
            } focus:outline-none`}
          >
            {pageNum}
          </button>
        )
      })}

      {/* Next */}
      <button
        onClick={() => page < totalPages && navigate(`/${href}?page=${page + 1}`)}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none ${
          page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Tiếp
      </button>
    </div>
  )
}

export default Pagination
