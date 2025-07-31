import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        josefin: ['"Josefin Sans"', 'sans-serif'],
          libertinus: ['Libertinus Serif', 'serif'],
        playwrite: ['"Playwrite AU QLD"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
