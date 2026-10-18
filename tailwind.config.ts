import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { evergreen: "#133c31", cream: "#f8f8f4", mint: "#d9edc2", ink: "#1b211d" } } },
  plugins: []
} satisfies Config;
