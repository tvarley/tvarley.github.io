/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				charcoal: '#121212',
				matte: '#0a0a0a',
				'steel-blue': '#4682B4',
				silver: '#C0C0C0',
				'steel-grey': '#A9A9A9',
			},
			fontFamily: {
				serif: ['"Playfair Display"', 'serif'],
				mono: ['"JetBrains Mono"', 'monospace'],
			},
			boxShadow: {
				glass: '0 25px 50px -12px rgba(0,0,0,0.25)',
				'subtle-glow': '0 0 20px rgba(70,130,180,0.1)',
			},
			backgroundImage: {
				'hero-gradient': 'linear-gradient(135deg, #121212 0%, #1a1a2e 50%, #16213e 100%)',
			}
		},
	},
	plugins: [],
}
