/** Wild Flora Blooms design tokens */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Matched to the live site (wildflorablooms.com.au)
        ivory: { DEFAULT: '#FAF5F5', deep: '#F3ECEA' },
        linen: '#DDD8CC',
        sage: { DEFAULT: '#A2AC86', light: '#C9CFB6', pale: '#ECEEE4' },
        forest: { DEFAULT: '#A2AC86', deep: '#8C9670', soft: '#B9C1A0' },
        rose: { DEFAULT: '#D9BFB7', pale: '#F4EAE7', deep: '#A9786C' },
        clay: '#A85A3C',
        ink: { DEFAULT: '#1C1C1C', soft: '#4A4A46', mute: '#7C7C74' },
      },
      fontFamily: {
        serif: ['Cormorant', 'Georgia', 'serif'],
        sans: ['Cormorant', 'Georgia', 'serif'],
        caps: ['Cantarell', 'system-ui', 'sans-serif'],
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
