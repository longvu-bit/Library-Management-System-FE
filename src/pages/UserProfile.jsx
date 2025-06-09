'use client'

import { useState, useEffect } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Shield,
  Calendar,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from 'lucide-react'

// Sample user data based on User model
const sampleUserData = {
  _id: 'user123',
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@email.com',
  phone: '0123456789',
  role: 'client',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  addresses: [
    {
      _id: 'addr1',
      street: '123 Đường ABC, Phường XYZ',
      city: 'Hà Nội',
      isDefault: true,
    },
    {
      _id: 'addr2',
      street: '456 Đường DEF, Phường GHI',
      city: 'TP.HCM',
      isDefault: false,
    },
  ],
  active: true,
  createdAt: '2023-01-15T08:00:00.000Z',
  updatedAt: '2024-01-10T14:30:00.000Z',
}

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addresses: [],
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  useEffect(() => {
    // Simulate API call
    const fetchUserProfile = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(sampleUserData)
      setFormData({
        name: sampleUserData.name,
        email: sampleUserData.email,
        phone: sampleUserData.phone,
        addresses: [...sampleUserData.addresses],
      })
      setIsLoading(false)
    }

    fetchUserProfile()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...formData.addresses]
    newAddresses[index] = {
      ...newAddresses[index],
      [field]: value,
    }

    // If setting as default, unset others
    if (field === 'isDefault' && value) {
      newAddresses.forEach((addr, i) => {
        if (i !== index) addr.isDefault = false
      })
    }

    setFormData((prev) => ({
      ...prev,
      addresses: newAddresses,
    }))
  }

  const addAddress = () => {
    setFormData((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          _id: `new_${Date.now()}`,
          street: '',
          city: '',
          isDefault: prev.addresses.length === 0,
        },
      ],
    }))
  }

  const removeAddress = (index) => {
    const newAddresses = formData.addresses.filter((_, i) => i !== index)
    // If removed address was default and there are other addresses, make first one default
    if (formData.addresses[index].isDefault && newAddresses.length > 0) {
      newAddresses[0].isDefault = true
    }
    setFormData((prev) => ({
      ...prev,
      addresses: newAddresses,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải có 10 chữ số'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePassword = () => {
    const newErrors = {}

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại'
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới'
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user data
      const updatedUser = {
        ...user,
        ...formData,
        updatedAt: new Date().toISOString(),
      }

      setUser(updatedUser)
      setIsEditing(false)
      alert('Cập nhật thông tin thành công!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Có lỗi xảy ra. Vui lòng thử lại!')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordUpdate = async () => {
    if (!validatePassword()) return

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setShowPasswordForm(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      alert('Đổi mật khẩu thành công!')
    } catch (error) {
      console.error('Error updating password:', error)
      alert('Có lỗi xảy ra. Vui lòng thử lại!')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      addresses: [...user.addresses],
    })
    setIsEditing(false)
    setErrors({})
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In real app, upload to server
      const reader = new FileReader()
      reader.onload = (e) => {
        setUser((prev) => ({
          ...prev,
          avatar: e.target.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getRoleInfo = (role) => {
    switch (role) {
      case 'admin':
        return {
          label: 'Quản trị viên',
          color: 'bg-purple-100 text-purple-800',
          icon: Shield,
        }
      case 'client':
        return {
          label: 'Người dùng',
          color: 'bg-blue-100 text-blue-800',
          icon: User,
        }
      default:
        return {
          label: 'Không xác định',
          color: 'bg-gray-100 text-gray-800',
          icon: User,
        }
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải thông tin người dùng...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-96">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Không tìm thấy thông tin người dùng
          </h2>
          <p className="text-gray-500">Vui lòng thử lại sau</p>
        </div>
      </div>
    )
  }

  const roleInfo = getRoleInfo(user.role)
  const RoleIcon = roleInfo.icon

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Thông tin cá nhân</h1>
        <p className="text-gray-600 text-xl text-center">Quản lý thông tin tài khoản của bạn</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {user.avatar ? (
                    <img
                      src={user.avatar || '/placeholder.svg'}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <User className="h-16 w-16 text-gray-600" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* User Info */}
              <div className="text-center md:text-left text-white">
                <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                <p className="text-blue-100 mb-3">{user.email}</p>
                <div className="flex flex-col md:flex-row gap-3">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${roleInfo.color} bg-white`}
                  >
                    <RoleIcon className="h-4 w-4" />
                    {roleInfo.label}
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                    <Calendar className="h-4 w-4" />
                    Tham gia {formatDate(user.createdAt)}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="ml-auto">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Lưu
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Thông tin cá nhân</h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                      } ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                      } ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.email && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="0123456789"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                      } ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.phone && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Địa chỉ</h3>
                  {isEditing && (
                    <button
                      onClick={addAddress}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      Thêm địa chỉ
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {formData.addresses.map((address, index) => (
                    <div key={address._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            Địa chỉ {index + 1}
                          </span>
                          {address.isDefault && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Mặc định
                            </span>
                          )}
                        </div>
                        {isEditing && formData.addresses.length > 1 && (
                          <button
                            onClick={() => removeAddress(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <input
                          type="text"
                          value={address.street}
                          onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Số nhà, tên đường, phường/xã"
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                          }`}
                        />
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Quận/huyện, tỉnh/thành phố"
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                          }`}
                        />
                        {isEditing && (
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={address.isDefault}
                              onChange={(e) =>
                                handleAddressChange(index, 'isDefault', e.target.checked)
                              }
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Đặt làm địa chỉ mặc định</span>
                          </label>
                        )}
                      </div>
                    </div>
                  ))}

                  {formData.addresses.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>Chưa có địa chỉ nào</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Bảo mật</h3>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {showPasswordForm ? 'Hủy' : 'Đổi mật khẩu'}
            </button>
          </div>

          {showPasswordForm && (
            <div className="border-t pt-6">
              <div className="max-w-md space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu hiện tại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange(e)}
                      name="currentPassword"
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.currentPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({ ...prev, current: !prev.current }))
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.currentPassword}</span>
                    </div>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange(e)}
                      name="newPassword"
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.newPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.newPassword}</span>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác nhận mật khẩu mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange(e)}
                      name="confirmPassword"
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handlePasswordUpdate}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Cập nhật mật khẩu
                </button>
              </div>
            </div>
          )}

          {!showPasswordForm && (
            <div className="text-gray-600">
              <p>Mật khẩu được cập nhật lần cuối: {formatDate(user.updatedAt)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
