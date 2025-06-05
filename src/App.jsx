import HomePage from '~/pages/HomePage'
import { Route, Routes } from 'react-router'
import Login from '~/pages/Login'
import Signup from '~/pages/Signup'
import ClientLayout from '~/layouts/ClientLayout'
import DetailBook from '~/pages/DetailBook'
import BorrowBook from '~/pages/BorrowBook'
import NotFound from '~/pages/NotFound'
import HistoryBorrowBook from './pages/HistoryBorrowBook'

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
