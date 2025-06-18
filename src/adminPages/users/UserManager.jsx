'use client'

import { useState } from 'react'
import {
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  Plus,
  Users,
} from 'lucide-react'

import { formatDate } from '../../utils/formatters'
import { debouncedSearch } from '../../customHook/debounceSearch'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import Pagination from '../../components/Pagination'
import { toast } from 'react-toastify'
import { deleteUserAPI, fetchAllUsersAPI, updateUserAPI } from '../../apis/admin'

const UserManager = () => {
  const navigate = useNavigate()

  let [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const [users, setUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [searchUser, setSearchUser] = useState('')
  const debouncedUserSearch = debouncedSearch(searchUser, 500)

  //sort
  const [sortBy, setSortBy] = useState('')
  const [order, setOrder] = useState('')

  const [openDropdown, setOpenDropdown] = useState(null)
  const [dropdownType, setDropdownType] = useState(null)

  useEffect(() => {
    navigate(`/admin/users?page=1&search=${debouncedUserSearch}&sortBy=${sortBy}&order=${order}`)
  }, [navigate, debouncedUserSearch, sortBy, order])

  useEffect(() => {
    fetchAllUsersAPI(page, debouncedUserSearch, sortBy, order).then((res) => {
      setUsers(res.users)
      setTotalUsers(res.totalDocuments)
      setTotalPages(res.totalPages)
    })
  }, [page, debouncedUserSearch, sortBy, order])

  // const handleEdit = (id) => {
  //   console.log('Edit user:', id)
  //   // Implement edit functionality
  // }

  const handleDelete = (id) => {
    if (confirm('Sếp đừng bỏ em!')) {
      toast
        .promise(deleteUserAPI(id), {
          pending: 'Deleting user...',
        })
        .then(() => {
          setUsers(users.filter((user) => user._id !== id))
          toast.success('Xóa thành công')
        })
    }
  }

  // const handleAddUser = () => {
  //   console.log('Add new user')
  //   // Implement add user functionality
  // }

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setOrder('desc')
    }
  }

  const handleRoleChange = (userId, newRole) => {
    toast
      .promise(updateUserAPI({ role: newRole }, userId), {
        pending: 'Updating user role...',
      })
      .then((res) => {
        setUsers((prev) =>
          prev.map((user) => {
            if (user._id == userId) user = res
            return user
          }),
        )
        toast.success('Thay đổi vai trò người dùng thành công')
      })

    setOpenDropdown(null)
    setDropdownType(null)
  }

  const toggleDropdown = (id, type) => {
    if (openDropdown === id && dropdownType === type) {
      setOpenDropdown(null)
      setDropdownType(null)
    } else {
      setOpenDropdown(id)
      setDropdownType(type)
    }
  }

  return (
    <div className="user-manager mx-auto p-6 container-admin">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý người dùng</h1>
        <button
          // onClick={handleAddUser}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {/* <Plus className="h-4 w-4 mr-2" /> */}
          Thêm người dùng
        </button>
      </div>

      {/* Statistics Card */}
      <div className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Users className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Tổng số người dùng</p>
              <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}

      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tên người dùng</span>
                    <button
                      onClick={() => handleSort('name')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {sortBy === 'name' ? (
                        order === 'asc' ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        <ArrowUpDown />
                      )}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Email</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Ngày tham gia</span>
                    <button
                      onClick={() => handleSort('createdAt')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {sortBy === 'createdAt' ? (
                        order === 'asc' ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        <ArrowUpDown />
                      )}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(user._id, 'role')}
                        className="flex items-center justify-between w-36 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {user.role}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </button>

                      {openDropdown === user._id && dropdownType === 'role' && (
                        <div className="absolute z-10 mt-1 w-44 bg-white rounded-md shadow-lg border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleRoleChange(user._id, 'admin')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                              Quản trị viên
                            </button>
                            <button
                              onClick={() => handleRoleChange(user._id, 'client')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Client
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(user.id, 'status')}
                        className="flex items-center justify-between w-40 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {getStatusLabel(user.status)}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </button>

                      {openDropdown === user.id && dropdownType === 'status' && (
                        <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleStatusChange(user.id, 'active')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Hoạt động
                            </button>
                            <button
                              onClick={() => handleStatusChange(user.id, 'inactive')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                              Không hoạt động
                            </button>
                            <button
                              onClick={() => handleStatusChange(user.id, 'suspended')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Tạm khóa
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(user.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {/* <button 
                        onClick={() => handleEdit(user.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Edit className="h-4 w-4" />
                      </button> */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-1.5 border border-gray-300 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchUser ? 'Không tìm thấy người dùng phù hợp' : 'Không có người dùng nào'}
            </p>
          </div>
        )}
      </div>

      <div className="text-center mt-2.5">
        Hiển thị: {users.length} / {users.length} người dùng
      </div>
      {/* Pagination */}
      <Pagination page={page} href={'admin/users'} totalPages={totalPages} />
    </div>
  )
}

export default UserManager
