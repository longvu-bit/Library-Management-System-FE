'use client'

import { useState } from 'react'
import {
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Plus,
  Building2,
  Eye,
  Globe,
  Mail,
  Phone,
} from 'lucide-react'

const PublisherManager = () => {
  const [publishers, setPublishers] = useState([
    {
      id: 1,
      name: 'NXB Giáo dục Việt Nam',
      address: '81 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
      email: 'info@nxbgd.vn',
      phone: '024-3822-5555',
      website: 'https://nxbgd.vn',
    },
    {
      id: 2,
      name: 'NXB Trẻ',
      address: '161B Lý Chính Thắng, Phường 7, Quận 3, TP.HCM',
      email: 'nxbtre@nxbtre.com.vn',
      phone: '028-3930-5859',
      website: 'https://nxbtre.com.vn',
    },
    {
      id: 3,
      name: 'NXB Công nghệ',
      address: '25 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
      email: 'contact@nxbcongnghe.vn',
      phone: '024-3756-8888',
      website: 'https://nxbcongnghe.vn',
    },
    {
      id: 4,
      name: "O'Reilly Media",
      address: '1005 Gravenstein Highway North, Sebastopol, CA 95472, USA',
      email: 'info@oreilly.com',
      phone: '+1-800-998-9938',
      website: 'https://oreilly.com',
    },
    {
      id: 5,
      name: 'NXB Tổng hợp TP.HCM',
      address: '62 Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, TP.HCM',
      email: 'nxbtonghop@hcm.vnn.vn',
      phone: '028-3822-6062',
      website: 'https://nxbtonghop.com.vn',
    },
    {
      id: 6,
      name: 'Penguin Random House',
      address: '1745 Broadway, New York, NY 10019, USA',
      email: 'info@penguinrandomhouse.com',
      phone: '+1-212-782-9000',
      website: 'https://penguinrandomhouse.com',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState(null)
  const [sortField, setSortField] = useState('name')

  const handleEdit = (id) => {
    console.log('Edit publisher:', id)
    // Implement edit functionality
  }

  const handleDelete = (id) => {
    setPublishers(publishers.filter((publisher) => publisher.id !== id))
  }

  const handleView = (id) => {
    console.log('View publisher details:', id)
    // Implement view details functionality
  }

  const handleAddPublisher = () => {
    console.log('Add new publisher')
    // Implement add publisher functionality
  }

  const filteredAndSortedPublishers = publishers
    .filter(
      (publisher) =>
        publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publisher.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publisher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publisher.phone.includes(searchTerm) ||
        publisher.website.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortOrder) return 0

      const valueA = a[sortField].toLowerCase()
      const valueB = b[sortField].toLowerCase()

      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
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

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    if (sortOrder === 'asc') return <ArrowUp className="h-4 w-4" />
    if (sortOrder === 'desc') return <ArrowDown className="h-4 w-4" />
    return <ArrowUpDown className="h-4 w-4" />
  }

  const totalPublishers = publishers.length

  return (
    <div className="publisher-manager mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý nhà xuất bản</h1>
        <button
          onClick={handleAddPublisher}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm nhà xuất bản
        </button>
      </div>

      {/* Statistics Card */}
      <div className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Building2 className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Tổng số nhà xuất bản</p>
              <p className="text-3xl font-bold text-gray-800">{totalPublishers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, địa chỉ, email, SĐT hoặc website..."
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
                    <span>Tên nhà xuất bản</span>
                    <button
                      onClick={() => handleSort('name')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon('name')}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa chỉ
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin liên hệ
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedPublishers.map((publisher) => (
                <tr key={publisher.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{publisher.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-900 max-w-xs">
                        {publisher.name.length > 30
                          ? `${publisher.name.substring(0, 30)}...`
                          : publisher.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md">
                      <p className="line-clamp-2" title={publisher.address}>
                        {publisher.address.length > 80
                          ? `${publisher.address.substring(0, 80)}...`
                          : publisher.address}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Mail className="h-3 w-3 text-gray-400 mr-2" />
                        <span className="truncate max-w-xs" title={publisher.email}>
                          {publisher.email}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 text-gray-400 mr-2" />
                        <span>{publisher.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <a
                        href={publisher.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                        title={publisher.website}
                      >
                        <Globe className="h-3 w-3 mr-2" />
                        <span className="truncate max-w-xs">
                          {publisher.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </span>
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(publisher.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-green-600 hover:text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(publisher.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(publisher.id)}
                        className="p-1.5 border border-gray-300 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                        title="Xóa"
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

        {filteredAndSortedPublishers.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? 'Không tìm thấy nhà xuất bản phù hợp'
                : 'Chưa có nhà xuất bản nào trong hệ thống'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {filteredAndSortedPublishers.length} / {publishers.length} nhà xuất bản
      </div>
    </div>
  )
}

export default PublisherManager
