/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '840px',
      },
      maxWidth: {
        'mobile': '840px',
      },
      fontFamily: {
        'pretendard': ["Pretendard Variable", "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "sans-serif"],
        'gmarket': ["GmarketSans", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "Apple SD Gothic Neo", "sans-serif"],
      },
      colors: {
        'base': '#191919',
        'text': '#2C2C2C',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // SCSS reset과의 충돌 방지
  },
}