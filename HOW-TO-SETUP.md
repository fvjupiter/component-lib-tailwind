# Library, Git, Npm, Components (you need the same react versions in lib and app)
https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe#prerequisites-and-setup

- show .npmrc (hidden files) in finder press:
Command + Shift + .

# tailwind
https://dev.to/alexandprivate/react-component-library-with-tailwindcss-in-3-mins-3pgb

OR:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

- root/tailwind.config.js:

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

- root/tailwind.css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer components {
    .center{
      @apply flex items-center justify-center
    }
  }


- root/components/index.ts
import '../tailwind.css'

# storybook
https://www.youtube.com/watch?v=hf6Z8OZanec&t=1003s

# commands
npm run storybook
npm run rollup
npm publish (change version of library in package.json)
git add .
git commit -m "message"
git push
