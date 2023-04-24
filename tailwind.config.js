/** @type {import('tailwindcss').Config} */
import * as colors from "@radix-ui/colors"

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
  ],
}

