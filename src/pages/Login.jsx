import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { loginAPI } from '../apis/auth'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const login = (data) => {
    const { email, password } = data

    toast
      .promise(loginAPI({ email, password }), {
        pending: 'Logging in...',
      })
      .then((res) => {
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        localStorage.setItem('user', JSON.stringify(res.user))
        toast.success('Đăng nhập thành công!')
        navigate('/')
      })
  }

  return (
    <div>
      <section className="bg-white min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Library
          </a>
          <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md">
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                Đăng nhập tài khoản
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit(login)}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    {...register('email', {
                      required: true,
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Email không hợp lệ',
                      },
                    })}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message || 'Email là bắt buộc'}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Mật khẩu
                  </label>
                  <input
                    {...register('password', {
                      required: true,
                      minLength: {
                        value: 6,
                        message: 'Mật khẩu phải có ít nhất 6 ký tự',
                      },
                    })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message || 'Mật khẩu là bắt buộc'}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Đăng nhập
                </button>
                <p className="text-sm text-gray-600">
                  Chưa có tài khoản?
                  <Link to={'/signup'} className="text-blue-600 hover:underline">
                    Đăng ký ngay
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
