'use client'

import { useEffect, useState } from 'react'
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

import { debouncedSearch } from '../../customHook/debounceSearch'

import { useNavigate, useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import {
  createPublisherAPI,
  deletePublisherAPI,
  fetchAllPublishersAPI,
  updatePublisherAPI,
} from '../../apis/admin'
import Pagination from '../../components/Pagination'
import AddOrUpdatePublisherModal from './AddOrUpdatePublisherModal'

const PublisherManager = () => {
  const navigate = useNavigate()

  let [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const [publishers, setPublishers] = useState([])
  const [totalPublishers, setTotalPublishers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [showModal, setShowModal] = useState(false)
  const [editingPublisher, setEditingPublisher] = useState(null)

  const [searchPublisher, setSearchPublisher] = useState('')
  const debouncedPublisherSearch = debouncedSearch(searchPublisher, 500)

  const sortBy = 'name'
  const [order, setOrder] = useState('')

  useEffect(() => {
    navigate(
      `/admin/publishers?page=1&search=${debouncedPublisherSearch}&sortBy=${sortBy}&order=${order}`,
    )
  }, [navigate, debouncedPublisherSearch, sortBy, order])

  useEffect(() => {
    fetchAllPublishersAPI(page, debouncedPublisherSearch, sortBy, order).then((res) => {
      setPublishers(res.publishers)
      setTotalPublishers(res.totalDocuments)
      setTotalPages(res.totalPages)
    })
  }, [page, debouncedPublisherSearch, sortBy, order])

  const handleCreateOrUpdatePublisher = (name, address, email, phone, website, idEdit = null) => {
    if (idEdit) {
      toast
        .promise(updatePublisherAPI({ name, address, email, phone, website }, idEdit), {
          pending: 'Updating publisher...',
        })
        .then((res) => {
          setPublishers((prev) =>
            prev.map((publisher) => {
              if (publisher._id == idEdit) publisher = res
              return publisher
            }),
          )

          toast.success('Cập nhật thành công')
        })
    } else {
      toast
        .promise(createPublisherAPI({ name, address, email, phone, website }), {
          pending: 'Creating publisher...',
        })
        .then((res) => {
          setPublishers((prev) => [res, ...prev])

          toast.success('Thêm mới thành công')
        })
    }
  }

  const handleOpenEditModal = (publisher) => {
    setEditingPublisher(publisher)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (confirm('Sếp chắc chứ?')) {
      toast
        .promise(deletePublisherAPI(id), {
          pending: 'Deleting publisher',
        })
        .then(() => {
          setPublishers(publishers.filter((publisher) => publisher._id !== id))
          toast.success('Xóa thành công')
        })
    }
    return
  }

  const handleView = (id) => {
    console.log('View publisher details:', id)
    // Implement view details functionality
  }

  const handleSort = () => {
    setOrder(order === '' ? 'desc' : order === 'desc' ? 'asc' : 'desc')
  }

  return (
    <div className="publisher-manager mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý nhà xuất bản</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm nhà xuất bản
        </button>
      </div>
      {showModal && (
        <AddOrUpdatePublisherModal
          onClose={() => {
            setShowModal(false)
            if (editingPublisher) setEditingPublisher(null)
          }}
          onSubmit={handleCreateOrUpdatePublisher}
          publisherEdit={editingPublisher}
        />
      )}

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
            placeholder="Tìm kiếm theo tên..."
            value={searchPublisher}
            onChange={(e) => setSearchPublisher(e.target.value)}
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
                  STT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tên nhà xuất bản</span>
                    <button
                      onClick={() => handleSort()}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {order !== '' ? (
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
              {publishers.map((publisher, index) => (
                <tr key={publisher._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{index + 1}</div>
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
                        onClick={() => handleView(publisher._id)}
                        className="p-1.5 border border-gray-300 rounded-md text-green-600 hover:text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(publisher)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(publisher._id)}
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

        {publishers.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchPublisher
                ? 'Không tìm thấy nhà xuất bản phù hợp'
                : 'Chưa có nhà xuất bản nào trong hệ thống'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {publishers.length} / {publishers.length} nhà xuất bản
      </div>

      {/* Pagination */}
      <Pagination page={page} href={'admin/publishers'} totalPages={totalPages} />
    </div>
  )
}

export default PublisherManager
