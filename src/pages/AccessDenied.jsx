'use client'

import { useState, useEffect } from 'react'
import { Home, LogIn, Mail, Phone, HelpCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router'

const AccessDenied = () => {
  const contactInfo = {
    email: 'support@library.com',
    phone: '1900-1234',
  }

  const user = localStorage.getItem('user')

  const [countdown, setCountdown] = useState(10)

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (countdown == 0) navigate('/')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-12 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
            <p className="text-gray-300 text-lg">
              Bạn không có quyền truy cập trang này. Mọi thắc mắc vui lòng liên hệ quản trị viên!
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-6"></p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to={'/'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Home className="h-4 w-4" />
                Về trang chủ
              </Link>

              {!user && (
                <Link
                  to={'/login'}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  Đăng nhập
                </Link>
              )}
            </div>

            {/* Auto Redirect Notice */}
            <div className="text-center text-sm text-gray-500 mb-6">
              <p>
                Tự động chuyển về trang chủ sau{' '}
                <span className="font-semibold text-blue-600">{countdown}</span> giây
              </p>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Cần hỗ trợ?
                </h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-600">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {contactInfo.email}
                  </a>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessDenied
