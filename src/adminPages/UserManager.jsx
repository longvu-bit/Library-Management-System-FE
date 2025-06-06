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
} from 'lucide-react'

const UserManager = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-10',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0369852147',
      role: 'librarian',
      status: 'inactive',
      joinDate: '2024-01-20',
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      phone: '0741258963',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-12',
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      phone: '0159753486',
      role: 'user',
      status: 'suspended',
      joinDate: '2024-01-05',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState(null)
  const [sortField, setSortField] = useState('joinDate')
  const [openDropdown, setOpenDropdown] = useState(null)
  const [dropdownType, setDropdownType] = useState(null) // 'role' or 'status'

  const handleEdit = (id) => {
    console.log('Edit user:', id)
    // Implement edit functionality
  }

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleAddUser = () => {
    console.log('Add new user')
    // Implement add user functionality
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const filteredAndSortedUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm),
    )
    .sort((a, b) => {
      if (!sortOrder) return 0

      let valueA, valueB
      if (sortField === 'joinDate') {
        valueA = new Date(a.joinDate).getTime()
        valueB = new Date(b.joinDate).getTime()
      } else {
        valueA = a[sortField].toLowerCase()
        valueB = b[sortField].toLowerCase()
      }

      if (sortField === 'joinDate') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
      } else {
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }
    })

  const handleSort = (field) => {
    if (sortField === field) {
      if (sortOrder === null || sortOrder === 'desc') {
        setSortOrder('asc')
      } else {
        setSortOrder('desc')
      }
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
    setOpenDropdown(null)
    setDropdownType(null)
  }

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
    setOpenDropdown(null)
    setDropdownType(null)
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    if (sortOrder === 'asc') return <ArrowUp className="h-4 w-4" />
    if (sortOrder === 'desc') return <ArrowDown className="h-4 w-4" />
    return <ArrowUpDown className="h-4 w-4" />
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

  const getRoleLabel = (role) => {
    const roleConfig = {
      admin: { label: 'Quản trị viên', color: 'bg-purple-500' },
      librarian: { label: 'Thủ thư', color: 'bg-blue-500' },
      user: { label: 'Người dùng', color: 'bg-gray-500' },
    }
    const config = roleConfig[role] || { label: role, color: 'bg-gray-500' }
    return (
      <span className="flex items-center">
        <span className={`w-2 h-2 ${config.color} rounded-full mr-2`}></span>
        {config.label}
      </span>
    )
  }

  const getStatusLabel = (status) => {
    const statusConfig = {
      active: { label: 'Hoạt động', color: 'bg-green-500' },
      inactive: { label: 'Không hoạt động', color: 'bg-gray-500' },
      suspended: { label: 'Tạm khóa', color: 'bg-red-500' },
    }
    const config = statusConfig[status] || { label: status, color: 'bg-gray-500' }
    return (
      <span className="flex items-center">
        <span className={`w-2 h-2 ${config.color} rounded-full mr-2`}></span>
        {config.label}
      </span>
    )
  }

  return (
    <div className="user-manager mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý người dùng</h1>
        <button
          onClick={handleAddUser}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm người dùng
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tên người dùng</span>
                    <button
                      onClick={() => handleSort('name')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon('name')}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Email</span>
                    <button
                      onClick={() => handleSort('email')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon('email')}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Ngày tham gia</span>
                    <button
                      onClick={() => handleSort('joinDate')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon('joinDate')}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{user.id}</div>
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
                        onClick={() => toggleDropdown(user.id, 'role')}
                        className="flex items-center justify-between w-36 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {getRoleLabel(user.role)}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </button>

                      {openDropdown === user.id && dropdownType === 'role' && (
                        <div className="absolute z-10 mt-1 w-44 bg-white rounded-md shadow-lg border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleRoleChange(user.id, 'admin')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                              Quản trị viên
                            </button>
                            <button
                              onClick={() => handleRoleChange(user.id, 'librarian')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              Thủ thư
                            </button>
                            <button
                              onClick={() => handleRoleChange(user.id, 'user')}
                              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                              Người dùng
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(user.joinDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
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

        {filteredAndSortedUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'Không tìm thấy người dùng phù hợp' : 'Không có người dùng nào'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
        <div>
          Hiển thị: {filteredAndSortedUsers.length} / {users.length} người dùng
        </div>
        <div className="flex space-x-4">
          <span>Hoạt động: {users.filter((u) => u.status === 'active').length}</span>
          <span>Tạm khóa: {users.filter((u) => u.status === 'suspended').length}</span>
          <span>Không hoạt động: {users.filter((u) => u.status === 'inactive').length}</span>
        </div>
      </div>
    </div>
  )
}

export default UserManager
