import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF6EE',
          deep: '#F1EADB',
        },
        green: {
          DEFAULT: '#14342B',
          soft: '#2E4A41',
        },
        gold: {
          DEFAULT: '#B38B3F',
          text: '#7A5C1E',
        },
        error: '#9B2C2C',
        success: '#1F5A3A',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
      },
      fontSize: {
        'hero-h1': ['clamp(2.75rem, 6vw + 1rem, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.01em' }],
        'section-h2': ['clamp(2.25rem, 4vw + 1rem, 4rem)', { lineHeight: '1.05' }],
        'heading-h3': ['clamp(1.5rem, 2vw + 1rem, 2.25rem)', { lineHeight: '1.15' }],
        'lead': ['clamp(1.125rem, 0.5vw + 1rem, 1.25rem)', { lineHeight: '1.6' }],
        'body': ['clamp(1rem, 0.25vw + 0.9375rem, 1.125rem)', { lineHeight: '1.65' }],
        'eyebrow': ['clamp(0.75rem, 0.1vw + 0.725rem, 0.8125rem)', { lineHeight: '1.2', letterSpacing: '0.16em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '40': '10rem',
        '48': '12rem',
      },
      borderRadius: {
        'panel': '24px',
        'input': '4px',
        'gallery': '12px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 24px 48px -24px rgba(20, 52, 43, 0.25)',
      },
      maxWidth: {
        'container': '1320px',
        'prose-custom': '62ch',
      },
    },
  },
  plugins: [],
};

export default config;
