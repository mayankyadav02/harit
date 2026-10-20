/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#073D25',
          green: '#073D25',
          dark: '#052F1D',
          deeper: '#031E12',
          light: '#0c5234',
        },
        emerald: {
          DEFAULT: '#176B43',
          light: '#228B57',
          dark: '#0F4C2E',
        },
        leaf: {
          DEFAULT: '#8EBE3F',
          green: '#8EBE3F',
          light: '#A6D552',
          dark: '#739D30',
        },
        golden: {
          DEFAULT: '#F2B52C',
          yellow: '#F2B52C',
          light: '#F8C85E',
          dark: '#D89A14',
          subtle: '#FFF5DC',
        },
        saffron: {
          DEFAULT: '#E67E22',
          light: '#F39C12',
          dark: '#D35400',
        },
        amber: {
          DEFAULT: '#F59E0B',
          glow: '#FBBF24',
          dark: '#B45309',
        },
        ivory: {
          DEFAULT: '#F6F0DA',
          light: '#FAF7EA',
          dark: '#E7DCB9',
          muted: '#C8BE9E',
        },
        cream: {
          DEFAULT: '#F7F5EC',
          light: '#FDFBF7',
          dark: '#EDE8D6',
        },
        river: {
          DEFAULT: '#2788E8',
          blue: '#2788E8',
          light: '#5AA5F0',
          dark: '#1864B2',
        },
        earth: {
          DEFAULT: '#173A29',
          dark: '#173A29',
          charcoal: '#11251B',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      boxShadow: {
        nature: '0 10px 35px -5px rgba(7, 61, 37, 0.45)',
        'nature-lg': '0 20px 45px -10px rgba(5, 47, 29, 0.6)',
        gold: '0 8px 30px rgba(242, 181, 44, 0.25)',
        'gold-lg': '0 12px 38px rgba(242, 181, 44, 0.4)',
        soft: '0 4px 20px rgba(0, 0, 0, 0.08)',
        layered: '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(7,61,37,0.18)',
        sculpted: '0 18px 40px -10px rgba(4, 35, 22, 0.75), 0 4px 16px rgba(242, 181, 44, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.22)',
        'clay-extrusion': '0 14px 28px -6px rgba(3, 30, 18, 0.7), inset 0 2px 3px rgba(255, 245, 220, 0.25), inset 0 -3px 6px rgba(0, 0, 0, 0.45)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
    },
  },
  plugins: [],
}
