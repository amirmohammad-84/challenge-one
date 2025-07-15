/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // مسیر فایل‌های سورس پروژه رو متناسب با پروژه‌ات تغییر بده
  ],
  theme: {
    extend: {
      fontFamily: {
        'vazir': ['Vazir', 'sans-serif'],
        'yekan': ['Yekan', 'sans-serif'],  // این خط اضافه شده
      },
    },
  },
  plugins: [],
}
