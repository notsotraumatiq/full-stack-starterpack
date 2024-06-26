import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#151515",
        dawn: "#949495",
        dusk: "#202022",
        sunrise: "#F5F5FA",
        zenith: "#FFFFFF",
      },
    },
  },
  plugins: [],
} satisfies Config;
