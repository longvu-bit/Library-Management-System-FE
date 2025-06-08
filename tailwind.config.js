export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // <-- rất quan trọng
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
