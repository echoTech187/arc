const config = {
  content: [
    '../../node_modules/@lifespikes/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Contoh warna kustom jika ingin mendekati gambar
        'light-gray-bg': '#f5f7fa',
        'card-bg': '#ffffff',
        'purple-gradient-start': '#8e2de2',
        'purple-gradient-end': '#4a00e0',
        'blue-gradient-start': '#2196f3',
        'blue-gradient-end': '#2196f3', // Contoh
        // Anda bisa menambahkan lebih banyak warna dari gambar
      },
      boxShadow: {
        'custom': '0 4px 10px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
  }
};

export default config;
