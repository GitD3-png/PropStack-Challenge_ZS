/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PTAG color palette
        primary: '#0066cc',
        secondary: '#003366',
        accent: '#ff9900',
        light: '#f5f5f5',
        dark: '#333333',
      },
    },
  },
  plugins: [],
}
