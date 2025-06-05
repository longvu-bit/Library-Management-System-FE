import Footer from '~/components/Footer'
import Header from '~/components/Header'
import { Outlet } from 'react-router'

const ClientLayout = () => {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  )
}

export default ClientLayout
