import { Outlet } from 'react-router'
import AdminHeader from '../adminPages/HeaderDashBoard'

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  )
}

export default AdminLayout
