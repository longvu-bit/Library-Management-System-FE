import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { registerAPI } from '../apis/auth'

const Signup = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const signUp = (data) => {
    const { name, email, phone, password } = data

    console.log(password, data.confirmPassword)

    toast
      .promise(registerAPI({ name, email, password, phone }), {
        pending: 'Registration is in progress...',
      })
      .then((res) => {
        navigate(`/login?registeredEmail=${res.email}`)
        toast.success('Đăng ký thành công')
      })
  }

  return (
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
              Tạo tài khoản
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit(signUp)}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  {...register('name', {
                    required: true,
                    minLength: {
                      value: 3,
                      message: 'Username phải có ít nhất 3 ký tự',
                    },
                  })}
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="quyenbv..."
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message || 'Ten là bắt buộc'}
                  </p>
                )}
              </div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                  Phone
                </label>
                <input
                  {...register('phone', {
                    required: true,
                    pattern: {
                      value: /^\d{10,11}$/,
                      message: 'So dien thoai không hợp lệ',
                    },
                  })}
                  type="phone"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message || 'So dien thoai là bắt buộc'}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message || 'Mật khẩu là bắt buộc'}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  {...register('confirmPassword', {
                    required: true,
                    validate: (value) => value === watch('password') || 'Mật khẩu không khớp',
                  })}
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Đăng ký
              </button>
              <p className="text-sm text-gray-600">
                Đã có tài khoản?
                <Link to={'/login'} className="text-blue-600 hover:underline font-medium">
                  Đăng nhập tại đây
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
