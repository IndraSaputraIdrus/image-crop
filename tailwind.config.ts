import type { Config } from 'tailwindcss';
import {zinc} from "tailwindcss/colors"

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: zinc[950],
        secondary: zinc[800],
        foreground: zinc[200],
        muted: zinc[500]
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      }
    }
  },

  plugins: []
} satisfies Config;
