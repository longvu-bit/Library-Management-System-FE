/* eslint-disable no-unused-vars */
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
  Users,
  Eye,
} from 'lucide-react'

import {
  fetchAllAuthorsAPI,
  createAuthorAPI,
  updateAuthorAPI,
  deleteAuthorAPI,
} from '../../apis/admin'
import { useNavigate, useSearchParams } from 'react-router'

import { debouncedSearch } from '../../customHook/debounceSearch'

import AddOrUpdateAuthorModal from './AddOrUpdateAuthorModal'
import { toast } from 'react-toastify'
import { formatDate } from '../../utils/formatters'
import Pagination from '../../components/Pagination'

const AuthorManager = () => {
  const navigate = useNavigate()

  let [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const [authors, setAuthors] = useState([])
  const [totalAuthors, setTotalAuthors] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  //sort
  const [sortBy, setSortBy] = useState('')
  const [order, setOrder] = useState('')

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState(null)

  const [searchAuthor, setSearchAuthor] = useState('')
  const debouncedAuthorSearch = debouncedSearch(searchAuthor, 500)

  useEffect(() => {
    navigate(
      `/admin/authors?page=1&search=${debouncedAuthorSearch}&sortBy=${sortBy}&order=${order}`,
    )
  }, [navigate, debouncedAuthorSearch, sortBy, order])

  useEffect(() => {
    fetchAllAuthorsAPI(page, debouncedAuthorSearch, sortBy, order).then((res) => {
      setAuthors(res.authors)
      setTotalAuthors(res.totalDocuments)
      setTotalPages(res.totalPages)
    })
  }, [page, debouncedAuthorSearch, sortBy, order])

  const handleCreateOrUpdateAuthor = (name, bio, dateOfBirth, idEdit = null) => {
    //call api
    if (idEdit) {
      toast
        .promise(updateAuthorAPI({ name, bio, dateOfBirth }, idEdit), {
          pending: 'Updating author...',
        })
        .then((res) => {
          setAuthors((prev) =>
            prev.map((author) => {
              if (author._id == idEdit) author = res
              return author
            }),
          )
          toast.success('Cập nhật thành công')
        })
    } else {
      toast
        .promise(createAuthorAPI({ name, bio, dateOfBirth }), {
          pending: 'Creating new author...',
        })
        .then((res) => {
          setAuthors((prev) => [res, ...prev])
          toast.success('Thêm mới thành công')
        })
    }
  }

  const handleOpenModalEdit = (author) => {
    setEditingAuthor(author)
    setShowAddModal(true)
  }

  const handleDelete = (id) => {
    if (confirm('Sếp chắc chứ ?')) {
      toast
        .promise(deleteAuthorAPI(id), {
          pending: 'Deleting author...',
        })
        .then(() => {
          setAuthors(authors.filter((author) => author._id !== id))
          toast.success('Xóa thành công')
        })
    }
    return
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setOrder('desc')
    }
  }

  const handleView = (id) => {
    console.log('View author details:', id)
  }

  return (
    <div className="author-manager  mx-auto p-6 z-0">
      {/* Show and hide modal create author */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý tác giả</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm tác giả
        </button>
      </div>
      {showAddModal && (
        <AddOrUpdateAuthorModal
          onClose={() => {
            setShowAddModal(false)
            if (editingAuthor) setEditingAuthor(null)
          }}
          onSubmit={handleCreateOrUpdateAuthor}
          authorEdit={editingAuthor}
        />
      )}

      {/* Statistics Card */}
      <div className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Users className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Tổng số tác giả</p>
              <p className="text-3xl font-bold text-gray-800">{totalAuthors}</p>
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
            placeholder="Tìm kiếm theo tên tác giả..."
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
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
                  Stt
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tên tác giả</span>
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
                  Tiểu sử
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Ngày sinh</span>
                    <button
                      onClick={() => handleSort('dateOfBirth')}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {sortBy === 'dateOfBirth' ? (
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
              {authors.map((author, index) => (
                <tr key={author._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">
                          {author.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .substring(0, 2)}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{author.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md">
                      <p className="line-clamp-2" title={author.bio}>
                        {author.bio.length > 100
                          ? `${author.bio.substring(0, 100)}...`
                          : author.bio}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(author?.dateOfBirth)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(author._id)}
                        className="p-1.5 border border-gray-300 rounded-md text-green-600 hover:text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleOpenModalEdit(author)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(author._id)}
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

        {authors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchAuthor
                ? 'Không tìm thấy tác giả phù hợp'
                : 'Chưa có tác giả nào trong hệ thống'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {authors.length} / {authors.length} tác giả
      </div>

      {/* Pagination */}
      <Pagination page={page} href={'admin/authors'} totalPages={totalPages} />
    </div>
  )
}

export default AuthorManager
