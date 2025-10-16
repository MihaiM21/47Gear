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
        // Modern dark theme with purple accents
        'gaming': {
          50: '#F5F2FF',
          100: '#EAE5F5',
          200: '#D8D0E8',
          300: '#B6ADC6',
          400: '#9689A8',
          500: '#7A6C8F',
          600: '#5E5173',
          700: '#473A5C',
          800: '#2B2439',
          900: '#1A1423',
        },
        'accent': {
          'primary': '#8A63FF', // Brighter purple for primary accents
          'secondary': '#C2A0FF', // Light purple for secondary accents
          'tertiary': '#5F45B0', // Darker purple for tertiary accents
          'red': '#FF4A6E', // Modern red accent for sales/alerts
          'green': '#4EEAAA', // Modern green for success states
        },
      },
      boxShadow: {
        'neon': '0 0 5px rgba(138, 99, 255, 0.5), 0 0 20px rgba(138, 99, 255, 0.3)',
        'neon-purple': '0 0 5px rgba(194, 160, 255, 0.5), 0 0 20px rgba(194, 160, 255, 0.3)',
        'neon-dark': '0 0 5px rgba(95, 69, 176, 0.5), 0 0 20px rgba(95, 69, 176, 0.3)',
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
          '0%, 100%': { boxShadow: '0 0 5px rgba(138, 99, 255, 0.3), 0 0 15px rgba(138, 99, 255, 0.2)' },
          '50%': { boxShadow: '0 0 8px rgba(138, 99, 255, 0.6), 0 0 25px rgba(138, 99, 255, 0.4)' },
        },
        glowPurple: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(194, 160, 255, 0.3), 0 0 15px rgba(194, 160, 255, 0.2)' },
          '50%': { boxShadow: '0 0 8px rgba(194, 160, 255, 0.6), 0 0 25px rgba(194, 160, 255, 0.4)' },
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
        glowPurple: "glowPurple 2s ease-in-out infinite",
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
