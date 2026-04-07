/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        terminalBg: '#0a0a0a',
        terminalGreen: '#00ff00',
        terminalBlue: '#00bfff',
        terminalRed: '#ff5555',
        terminalYellow: '#ffff00',
        terminalPurple: '#ff00ff',
        terminalCyan: '#00ffff',
        terminalOrange: '#ff8800',
        terminalGray: '#888888',
        hackerGreen: '#00ff41',
        hackerBlue: '#0080ff',
        hackerRed: '#ff0040',
        hackerYellow: '#ffaa00',
        hackerPurple: '#aa00ff',
        hackerCyan: '#00ffff',
      },
      fontFamily: {
        mono: ['Fira Mono', 'monospace'],
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        scan: 'scan 3s linear infinite',
        flicker: 'flicker 0.15s infinite',
        slideIn: 'slideIn 0.5s ease-out',
        typewriter: 'typewriter 3s steps(40) infinite',
        matrix: 'matrix 20s linear infinite',
        float: 'float 3s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out',
        borderGlow: 'borderGlow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        glow: {
          '0%': { textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor' },
          '100%': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'currentColor', boxShadow: '0 0 5px currentColor' },
          '50%': { borderColor: 'currentColor', boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
      },
    },
  },
  plugins: [],
};