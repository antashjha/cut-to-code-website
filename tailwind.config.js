/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        neon: {
          cyan: '#00fff5',
          pink: '#ff00c8',
          green: '#00ff88',
          purple: '#bf00ff',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Rajdhani"', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 3s infinite',
        'scanline': 'scanline 8s linear infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.6' },
          '97%': { opacity: '1' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseNeon: {
          '0%, 100%': { textShadow: '0 0 7px #00fff5, 0 0 10px #00fff5, 0 0 21px #00fff5' },
          '50%': { textShadow: '0 0 14px #00fff5, 0 0 30px #00fff5, 0 0 50px #00fff5' },
        }
      }
    },
  },
  plugins: [],
}
