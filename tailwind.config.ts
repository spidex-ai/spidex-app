import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
			border: {
				main: '#5D717D'
			},
			bg: {
				gray: '#5D717D99',
				main: '#131E2F',
				secondary: '#0B1320',
				tab: '#010A19'
			},
  			brand: {
  				'50': '#ffffe7',
  				'100': '#ffffc1',
  				'200': '#fffb86',
  				'300': '#fff041',
  				'400': '#ffe00d',
  				'500': '#ffd100',
  				'600': '#BBF985',
  				'700': '#a66d02',
  				'800': '#89550a',
  				'900': '#74450f',
  				'950': '#442404',
				'1000': '#009EFF'
  			},
  			text: {
  				light: '#000000',
  				dark: '#ffffff',
				gray: '#5D717D'
  			},
  			sidebar: {
  				DEFAULT: 'var(--sidebar-background)',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))',
  				active: 'var(--sidebar-active)',
				
  			},
			main: {
				DEFAULT: 'var(--main-background)',
			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'shiny-text': 'shiny-text 8s infinite',
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear'
  		},
  		keyframes: {
  			'shiny-text': {
  				'0%, 90%, 100%': {
  					'background-position': 'calc(-100% - var(--shiny-width)) 0'
  				},
  				'30%, 60%': {
  					'background-position': 'calc(100% + var(--shiny-width)) 0'
  				}
  			},
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
