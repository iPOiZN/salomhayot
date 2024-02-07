// module.exports = {
//   theme: {
//     screens: {
//       sm: '640px',
//       md: '768px',
//       lg: '1024px',
//       xl: '1280px',
//     },
//     extend: {
//       colors: {
//         linkedin: {
//           primary: '#0A66C2',
//           lighter: '#378fe9',
//           darker: '#004182',
//         },
//       },
//     },
//   },
//   plugins: [require('@tailwindcss/typography')],
// }

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/flowbite/**/*.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
  content: ['./node_modules/flowbite/**/*.js'],
}
