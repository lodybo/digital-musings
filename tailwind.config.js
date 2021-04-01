module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    colors: {
      primary: {
        light: '#EEF9FB',
        DEFAULT: '#DCF2F7',
        dark: '#CDEDF4',
      },
      secondary: {
        light: '#D5E2EC',
        DEFAULT: '#BCD0E0',
        dark: '#ABC4D8',
      },
      tertiary: {
        light: '#725C5A',
        DEFAULT: '#655250',
        dark: '#5B4A48',
      },

      white: {
        light: '#FFFFFF',
        DEFAULT: '#F2F5F8',
        dark: '#E4EBF1',
      },

      black: {
        light: '#1D2935',
        DEFAULT: '#131B23',
        dark: '#0E141B',
      },

      success: {
        light: '#9CBFAD',
        DEFAULT: '#90B6A3',
        dark: '#84AE99',
      },
      warning: {
        light: '#FADC89',
        DEFAULT: '#F9D677',
        dark: '#F8D062',
      },
      error: {
        light: '#FB9E60',
        DEFAULT: '#FA924C',
        dark: '#FA8638',
      },
    },
    fontFamily: {
      title: [ '"Bungee Shade"', 'sans' ],
      heading: [ 'Bungee', 'sans' ],
      body: [ '"Roboto Slab"', 'sans-serif' ],
      code: [ '"Roboto Mono"', 'monospace' ],
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
