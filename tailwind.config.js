module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 5px 5px -1px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        '4xl': '0 0 5px 2px rgba(0, 0, 0, 0.6), 0 0 4px 6px rgba(0, 0, 0, 0.3)',
        '5xl': '0 14px 18px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
        '6xl': '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)',
        '7xl': '0 62.5px 125px -25px rgba(0, 0, 0, 0.7), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)',
        'inner-xl': '0 2px 3px rgba(0, 0, 0, 0.5) inset',
        'inner-2xl': '0 2px 7px  black inset',
        'inner-none': '0 0 0 inset',
      },
    },
  },
  plugins: [],
}
