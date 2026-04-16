/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7F5F2",
        ink: "#111111",
        secondary: "#BFB8AF",
        accent: "#E6DFD7",
      },
      fontFamily: {
        editorial: ["var(--font-editorial)", "serif"],
        sans: ["var(--font-neue)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        frame: "1400px",
      },
      fontSize: {
        "display-xs": [
          "clamp(2.25rem, 4vw, 3.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        "display-sm": [
          "clamp(2.75rem, 5vw, 4.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        "display-md": [
          "clamp(3.25rem, 7vw, 6rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        "display-lg": [
          "clamp(3.75rem, 9vw, 8rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        "display-xl": [
          "clamp(4.5rem, 12vw, 11rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
      },
    },
  },
  plugins: [],
};
