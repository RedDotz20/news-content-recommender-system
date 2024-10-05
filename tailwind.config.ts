import type { Config } from 'tailwindcss';
import fluid, { extract } from 'fluid-tailwind';

const config: Config = {
	darkMode: ['class'],
	content: {
		files: [
			'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
			'./components/**/*.{js,ts,jsx,tsx,mdx}',

			// Or if using `src` directory:
			'./src/**/*.{js,ts,jsx,tsx,mdx}',
		],
		extract,
	},
	theme: {
		extend: {
			screens: {
				//? set values to (rem) for fluid-tailwind to work
				xs: '20rem', // Extra small screens (320px)
				sm: '40rem', // Small screens (640px
				lg: '64rem', // Large screens (1024px))
				md: '48rem', // Medium screens (768px)
				xl: '80rem', // Extra large screens (1280px)
				'2xl': '96rem', // 2x extra large screens (1536px)
				'3xl': '120rem', // 3x extra large screens (1920px)
			},
			animation: {
				gradient: 'gradient 8s linear infinite',
			},
			keyframes: {
				gradient: {
					to: {
						backgroundPosition: 'var(--bg-size) 0',
					},
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate'), fluid],
};
export default config;
