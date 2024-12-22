/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    screens: {
      mobile: { max: '767px' },
      tablet: { min: '768px', max: '1023px' },
      laptopS: { min: '1024px', max: '1250px' },
      laptop: { min: '1024px', max: '1439px' },
      desktop: { min: '1440px' },
    },
    colors: {
      primary: {
        DEFAULT: '#316BFF',
        'very-dark': '#2C60E4',
        dark: '#BACEFF',
        light: '#DCE6FF',
        'very-light': '#F4F7FF',
      },
      success: {
        DEFAULT: '#5BBE79',
      },
      error: {
        DEFAULT: '#FF0000',
      },
      'text-icon': {
        DEFAULT: '#201E21',
        secondary: '#FFFFFF',
        secondary2: '#5A5A5A',
        secondary3: '#757575',
        'very-light': '#DEDEDE',
      },
      neutral: {
        DEFAULT: '#F8F8F8',
        'secondary-white': '#F0EEEE',
        'illustration-bg': '#F8F7F7',
        disabled: '#CAC4C4',
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontSize: {
        h1: ['64px', { lineHeight: '80px', fontWeight: '600' }],
        h2: ['48px', { lineHeight: '64px', fontWeight: '600' }],
        h3: ['36px', { lineHeight: '44px', fontWeight: '600' }],
        h4: ['32px', { lineHeight: '48px', fontWeight: '600' }],
        h5: ['30px', { lineHeight: '38px', fontWeight: '600' }],
        h6: ['28px', { lineHeight: '34px', fontWeight: '600' }],
        h7: ['24px', { lineHeight: '36px', fontWeight: '600' }],
        h8: ['24px', { lineHeight: '36px', fontWeight: '600' }],
        h9: ['20px', { lineHeight: '30px', fontWeight: '600' }],
        h10: ['18px', { lineHeight: '28px', fontWeight: '600' }],
        h11: ['18px', { lineHeight: '22px', fontWeight: '500' }],
        h12: ['18px', { lineHeight: '22px', fontWeight: '500' }],
        title: ['28px', { lineHeight: '33.89px', fontWeight: '600' }],
        description: ['18px', { lineHeight: '21.78px', fontWeight: '400' }],
        subtitle1: ['16px', { lineHeight: '24px', fontWeight: '600' }],
        subtitle2: ['14px', { lineHeight: '22px', fontWeight: '600' }],
        subtitle3: ['18px', { lineHeight: '21.78px', fontWeight: '500' }],
        body1: ['16px', { lineHeight: '24px', fontWeight: '500' }],
        body2: ['14px', { lineHeight: '22px', fontWeight: '500' }],
        caption: ['12px', { lineHeight: '18px', fontWeight: '500' }],
        overline: [
          '12px',
          { lineHeight: '18px', fontWeight: '700', letterSpacing: '0.12em' },
        ],
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(45deg, #101828, #475467)',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        'waving-hand': ' wave 2s linear infinite ',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
