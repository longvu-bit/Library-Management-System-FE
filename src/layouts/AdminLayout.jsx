import { Outlet } from 'react-router'
import AdminSidebar from '../adminPages/HeaderDashBoard'

const AdminLayout = () => {
  return (
    <>
     <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex">
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default AdminLayout
