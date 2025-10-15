const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
      },
      colors: {
        // Modern gaming color scheme
        'gaming': {
          50: '#F5F5F7',
          100: '#EBEDF2',
          200: '#D0D5E1',
          300: '#9BA4BC',
          400: '#6E7A9A',
          500: '#444E67',
          600: '#323849',
          700: '#1F2331',
          800: '#161A24',
          900: '#0C0E14',
        },
        'accent': {
          'primary': '#7D5DEC', // Purple for primary accents
          'secondary': '#29D8DB', // Cyan for secondary accents
          'red': '#FF3C5F', // Modern red accent for sales/alerts
          'green': '#2AE794', // Modern green for success states
        },
      },
      boxShadow: {
        'neon': '0 0 5px rgba(125, 93, 236, 0.5), 0 0 20px rgba(125, 93, 236, 0.3)',
        'neon-cyan': '0 0 5px rgba(41, 216, 219, 0.5), 0 0 20px rgba(41, 216, 219, 0.3)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: {
            opacity: 1,
          },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(125, 93, 236, 0.3), 0 0 15px rgba(125, 93, 236, 0.2)' },
          '50%': { boxShadow: '0 0 8px rgba(125, 93, 236, 0.6), 0 0 25px rgba(125, 93, 236, 0.4)' },
        }
      },
      blink: {
        "0%": { opacity: 0.2 },
        "20%": { opacity: 1 },
        "100%": { opacity: 0.2 },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        blink: "blink 1.4s both infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
