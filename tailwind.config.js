/** Wild Flora Blooms design tokens */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: '#F7F3EC', deep: '#EFE8DC' },
        linen: '#E6DCCB',
        sage: { DEFAULT: '#97A48A', light: '#C9D0BE', pale: '#E3E7DB' },
        forest: { DEFAULT: '#22372A', deep: '#18281E', soft: '#3A5243' },
        rose: { DEFAULT: '#D6B3A8', pale: '#EEDDD6', deep: '#A9786C' },
        clay: '#B0613E',
        ink: { DEFAULT: '#1E2820', soft: '#4C564D', mute: '#7A8278' },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.75rem, 6vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2.25rem, 4.2vw, 3.6rem)', { lineHeight: '1.06', letterSpacing: '-0.015em' }],
        'h2': ['clamp(1.85rem, 3vw, 2.6rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.2' }],
      },
      maxWidth: { page: '1360px' },
    },
  },
  plugins: [],
}
