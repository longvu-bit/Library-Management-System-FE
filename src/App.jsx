import HomePage from '~/pages/HomePage'
import { Route, Routes } from 'react-router'
import Login from '~/pages/Login'
import Signup from '~/pages/Signup'
import ClientLayout from '~/layouts/ClientLayout'
import DetailBook from '~/pages/DetailBook'
import BorrowBook from '~/pages/BorrowBook'
import NotFound from '~/pages/NotFound'
import HistoryBorrowBook from './pages/HistoryBorrowBook'

// Admin
import AdminLayout from './layouts/AdminLayout'
import BorrowBookManager from './adminPages/BorrowBookManager'
import UserManager from './adminPages/UserManager'
import BookManager from './adminPages/BookManager'
import PublisherManager from './adminPages/PublisherManager'
import AuthorManager from './adminPages/AuthorManager'
import CategoryManager from './adminPages/CategoryManager'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/details/:id" element={<DetailBook />} />
          <Route path="/books/borrow/:id" element={<BorrowBook />} />
          <Route path="/books/history" element={<HistoryBorrowBook />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<BorrowBookManager />} />
          <Route path="history" element={<BorrowBookManager />} />
          <Route path="users" element={<UserManager />} />
          <Route path="books" element={<BookManager />} />
          <Route path="authors" element={<AuthorManager />} />
          <Route path="publishers" element={<PublisherManager />} />
          <Route path="categories" element={<CategoryManager />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
