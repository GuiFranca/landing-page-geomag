module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--brand-050)', 100: 'var(--brand-100)',
          200: 'var(--brand-200)', 300: 'var(--brand-300)',
          400: 'var(--brand-400)', 500: 'var(--brand-500)',
          600: 'var(--brand-600)', 700: 'var(--brand-700)',
          800: 'var(--brand-800)', 900: 'var(--brand-900)',
        },
        accent: 'var(--accent)',
      }
    }
  },
  plugins: [],
}
