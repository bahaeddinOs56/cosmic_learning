/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  './pages/**/*.{js,ts,jsx,tsx,mdx}',
	  './components/**/*.{js,ts,jsx,tsx,mdx}',
	  './app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
	  extend: {
		backgroundImage: {
		  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
		  'gradient-conic':
			'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
		},
		keyframes: {
		  twinkle: {
			'0%, 100%': { opacity: 0.3 },
			'50%': { opacity: 1 },
		  },
		  'galaxy-spin': {
			'0%': { transform: 'rotate(0deg)' },
			'100%': { transform: 'rotate(360deg)' },
		  },
		},
		animation: {
		  twinkle: 'twinkle 3s ease-in-out infinite',
		  'galaxy-spin': 'galaxy-spin 20s linear infinite',
		},
	  },
	},
	plugins: [],
  }
  
  