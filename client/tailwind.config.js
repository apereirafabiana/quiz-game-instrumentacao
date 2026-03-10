/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.05), 0 24px 80px rgba(8, 15, 32, 0.45)",
        neon: "0 20px 45px rgba(34, 211, 238, 0.25)"
      },
      colors: {
        brand: {
          ink: "#07111f",
          cyan: "#37e4ff",
          lime: "#bef264",
          coral: "#ff7a59",
          gold: "#ffd166",
          rose: "#ff5ea8"
        }
      },
      borderRadius: {
        panel: "1.75rem"
      }
    }
  },
  plugins: []
};
