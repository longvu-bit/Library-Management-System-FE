import logo from '~/assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faHistory,
  faLocationDot,
  faMagnifyingGlass,
  faSignIn,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router'

import { logoutAPI } from '../apis/auth'
import { toast } from 'react-toastify'

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate()

  const handleLogout = () => {
    logoutAPI()
    localStorage.removeItem('user')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    navigate('/login')
    toast.success('Đăng xuất thành công')
  }

  return (
    <header className="flex flex-col">
      <div className="container flex justify-between items-center">
        <div className="w-1/5 cursor-pointer">
          <Link to={'/'}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <form action="" className="relative w-fit max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search books..."
              className="w-60 border border-gray-300 rounded-full p-2 pl-4 py-2 focus:outline-none placeholder:pl-2 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2  p-2 rounded-full transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
          <div className="flex items-center w-fit cursor-pointer gap-1">
            <FontAwesomeIcon icon={faLocationDot} /> Nam Định
          </div>
          <div className="flex items-center w-fit cursor-pointer gap-1">
            <FontAwesomeIcon icon={faClock} /> 24H
          </div>
          <div className="flex items-center w-fit cursor-pointer gap-1">
            {user ? (
              <div className="relative group">
                <Link to={'/profile'} className="p-2">
                  <FontAwesomeIcon icon={faUser} /> {user?.name}
                </Link>
                {/* Dropdown xuất hiện khi hover */}
                <ul className="absolute left-0  mt-2 hidden group-hover:block bg-white rounded shadow-lg z-10 min-w-[200px]">
                  <li>
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2  text-gray-700 hover:bg-blue-100"
                    >
                      <FontAwesomeIcon icon={faUser} /> Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/books/history"
                      className="block px-4 py-2  text-gray-700 hover:bg-blue-100"
                    >
                      <FontAwesomeIcon icon={faHistory} /> History
                    </Link>
                  </li>
                  <li>
                    <p
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faSignOut} /> Logout
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={'/login'}>
                <FontAwesomeIcon icon={faSignIn} /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <nav className="bg-blue-800">
        <ul className="container flex gap-7 items-center">
          <li>
            <Link to={'/'} className="text-white px-4 py-2 hover:bg-blue-700 transition-colors">
              Trang chủ
            </Link>
          </li>

          <li>
            <Link
              to={'/about'}
              className="text-white px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              Giới thiệu
            </Link>
          </li>
          <li>
            <Link to={'/news'} className="text-white px-4 py-2 hover:bg-blue-700 transition-colors">
              Tin tức
            </Link>
          </li>
          <li>
            <Link
              to={'/policies'}
              className="text-white px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              Chính sách bảo mật
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
