/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0d1117',
        surface: '#161b22',
        border: '#30363d',
        text: '#c9d1d9',
        'text-muted': '#8b949e',
        accent: '#58a6ff',
        'accent-green': '#3fb950',
        'accent-gold': '#d29922',
        'accent-red': '#f85149',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['LXGW WenKai', 'Noto Serif SC', 'Source Han Serif SC', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
