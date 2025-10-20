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
        // Updated dark theme with specific colors
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
          900: '#131313', // Updated to specific dark grey/black
        },
        'accent': {
          'primary': '#4A2B74', // Updated to specific purple
          'secondary': '#8A63FF', // Light purple for secondary accents
          'tertiary': '#2B1944', // Darker purple for tertiary accents
          'red': '#FF4A6E', // Modern red accent for sales/alerts
          'green': '#4EEAAA', // Modern green for success states
          'yellow': '#EFCA4E', // Added yellow accent
        },
      },
      boxShadow: {
        'neon': '0 0 5px rgba(74, 43, 116, 0.5), 0 0 20px rgba(74, 43, 116, 0.3)',
        'neon-purple': '0 0 5px rgba(138, 99, 255, 0.5), 0 0 20px rgba(138, 99, 255, 0.3)',
        'neon-dark': '0 0 5px rgba(43, 25, 68, 0.5), 0 0 20px rgba(43, 25, 68, 0.3)',
        'neon-yellow': '0 0 5px rgba(239, 202, 78, 0.5), 0 0 20px rgba(239, 202, 78, 0.3)',
        'neon-red': '0 0 5px rgba(255, 74, 110, 0.5), 0 0 20px rgba(255, 74, 110, 0.3)',
        'neon-cyan': '0 0 5px rgba(78, 234, 170, 0.5), 0 0 20px rgba(78, 234, 170, 0.3)',
        'inner-glow': 'inset 0 0 5px rgba(138, 99, 255, 0.2), inset 0 0 15px rgba(138, 99, 255, 0.1)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        '3d': '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)',
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
          '0%, 100%': { boxShadow: '0 0 5px rgba(74, 43, 116, 0.3), 0 0 15px rgba(74, 43, 116, 0.2)' },
          '50%': { boxShadow: '0 0 8px rgba(74, 43, 116, 0.6), 0 0 25px rgba(74, 43, 116, 0.4)' },
        },
        glowPurple: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(138, 99, 255, 0.3), 0 0 15px rgba(138, 99, 255, 0.2)' },
          '50%': { boxShadow: '0 0 8px rgba(138, 99, 255, 0.6), 0 0 25px rgba(138, 99, 255, 0.4)' },
        },
        glowYellow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(239, 202, 78, 0.3), 0 0 15px rgba(239, 202, 78, 0.2)' },
          '50%': { boxShadow: '0 0 8px rgba(239, 202, 78, 0.6), 0 0 25px rgba(239, 202, 78, 0.4)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-250px * 5))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'gradient-x': {
          '0%': { backgroundPosition: '0% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
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
        glowYellow: "glowYellow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        scroll: "scroll 50s linear infinite",
        float: "float 6s ease-in-out infinite",
        bounce: "bounce 2s ease-in-out infinite",
        spin: "spin 20s linear infinite",
        gradient: "gradient 15s ease infinite",
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        '300%': '300% 100%',
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
