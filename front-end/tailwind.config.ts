import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "Neutral/Black": "#000000",
        "Neutral/900": "#212529",
        "Neutral/800": "#343a40",
        "Neutral/700": "#495057",
        "Neutral/600": "#6c757d",
        "Neutral/500": "#adb5bd",
        "Neutral/400": "#ced4da",
        "Neutral/300": "#dee2e6",
        "Neutral/200": "#e9ecef",
        "Neutral/100": "#f8f9fa",
        "Blue/900": "#001733",
        "Blue/800": "#002f66",
        "Blue/700": "#004899",
        "Blue/600": "#0061cc",
        "Blue/500": "#007aff",
        "Blue/400": "#3b98ff",
        "Blue/300": "#75b6ff",
        "Blue/200": "#b0d5ff",
        "Blue/100": "#ebf4ff",
        "Purple/900": "#020a33",
        "Purple/800": "#0c1a66",
        "Purple/700": "#1d2f99",
        "Purple/600": "#354acb",
        "Purple/500": "#556aeb",
        "Purple/400": "#6e82fe",
        "Purple/300": "#8fa0ff",
        "Purple/200": "#b9c4ff",
        "Purple/100": "#ebefff",
        "Orange/900": "#332200",
        "Orange/800": "#664200",
        "Orange/700": "#996000",
        "Orange/600": "#cc7c00",
        "Orange/500": "#ff9500",
        "Orange/400": "#ffb23b",
        "Orange/300": "#ffcc75",
        "Orange/200": "#ffe3b0",
        "Orange/100": "#fff8eb",
      },
    },
    fontSize: {
      base: "0.8rem",
      lg: "1.0rem",
      lg2: "1.5rem",
      lg3: "1.75rem",
      xl: "2.25rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "3.75rem",
    },
    fontFamily: {
      inter: "Inter",
    },
    boxShadow: {
      "Shadow 1":
        "0px 0px 1px 0px rgba(33,37,41,0.32), 0px 4px 6px 0px rgba(33,37,41,0.2)",
      "Shadow 2":
        "0px 0px 1px 0px rgba(33,37,41,0.08), 0px 2px 2px 0px rgba(33,37,41,0.06)",
    },
  },
  plugins: [],
} satisfies Config;
