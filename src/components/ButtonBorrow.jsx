import { BookOpen, ShoppingCartIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { createCartClientAPI } from '../apis/client'
import { toast } from 'react-toastify'

const ButtonBorrow = ({ currentBook }) => {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const handleAddToCart = (id) => {
    if (!userInfo) return navigate('/login')
    toast
      .promise(createCartClientAPI(userInfo._id, id), {
        pending: 'Adding to cart...',
      })
      .then(() => {
        toast.success('Thêm vào giỏ thành công')
      })

    return true
  }

  const handleBorrowBook = (id) => {
    const isAddCart = handleAddToCart(id)
    if (isAddCart)
      setTimeout(() => {
        navigate('/user/carts')
      }, 300)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleBorrowBook(currentBook._id)}
        disabled={currentBook.available === 0}
        className={`flex-1 py-2 px-4 rounded font-medium transition-colors flex items-center justify-center gap-2 ${
          currentBook.available > 0
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        <BookOpen className="h-4 w-4" />
        {currentBook.available > 0 ? 'Mượn Sách' : 'Hết Sách'}
      </button>

      <button
        onClick={() => handleAddToCart(currentBook._id)}
        className="px-3 py-2 border-2 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded transition-colors"
      >
        <ShoppingCartIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

export default ButtonBorrow
