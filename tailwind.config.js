/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        court: "var(--court-green)",
        clay: "var(--clay)",
        ball: "var(--ball)",
        midnight: "var(--midnight)",
        sand: "var(--sand)",
        ink: "var(--ink)",
        card: "var(--card)",
        line: "var(--line)"
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.18)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    }
  },
  plugins: []
};
"@ | Set-Content tailwind.config.js -Encoding UTF8
