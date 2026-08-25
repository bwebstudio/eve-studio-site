/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Mirrors the custom properties in globals.css (:root) — keep the
      // two in sync. `bg` is the site ground: a warm off-white / soft
      // bone, extremely light and neutral without reading beige.
      colors: {
        bg: "#FAF8F5",
        // One quiet step darker, same warm family — used by the clients
        // band so the strip gets its own moment without a hard contrast.
        "bg-mute": "#F1EDE7",
        ink: "#111111",
        secondary: "#B3ACA4",
        accent: "#EFE9E1",
      },
      fontFamily: {
        editorial: ["var(--font-editorial)", "serif"],
        sans: [
          "var(--font-sans)",
          "var(--font-neue)",
          "system-ui",
          "sans-serif",
        ],
        general: [
          "var(--font-sans)",
          "var(--font-neue)",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        frame: "1400px",
      },
      fontSize: {
        "display-xs": [
          "clamp(2rem, 3.5vw, 2.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "clamp(2.5rem, 4.5vw, 3.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(3rem, 6vw, 5.25rem)",
          { lineHeight: "1.04", letterSpacing: "-0.025em" },
        ],
        "display-lg": [
          "clamp(3.5rem, 8vw, 7rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        "display-xl": [
          "clamp(4rem, 10.5vw, 9.5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.035em" },
        ],
      },
    },
  },
  plugins: [],
};
