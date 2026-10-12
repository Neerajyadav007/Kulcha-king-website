/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./menu.html",
    "./about.html",
    "./contact.html",
    "./404.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        'primary-orange': '#FF6B00',
        'primary-orange-hover': '#E05E00',
        'accent-green': '#2D8A4E',
        'accent-green-bg': '#EBF7EE',
        'bg-primary': '#FAF8F5',
        'bg-card': '#FFFFFF',
        'text-dark': '#1F1F1F',
        'text-muted': '#666666',
        'border-light': '#EAEAEA',
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        amber: {
          50: '#fbf7f4',
          100: '#f6ede7',
          200: '#eedad0',
          300: '#e3beaf',
          400: '#d97757',
          500: '#c96442',
          600: '#b05730',
          700: '#944422',
          800: '#79381e',
          900: '#64311c',
        },
        tandoor: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        dark: {
          950: '#1f1e1d',
          900: '#262624',
          850: '#2c2c2b',
          800: '#343434',
          750: '#3e3e38',
          700: '#52514a',
        },
        cream: {
          50: '#faf9f5',
          100: '#f5f4ef',
          200: '#ede9de',
          300: '#e9e6dc',
        }
      },
      fontFamily: {
        serif: ['"Libre Caslon Condensed"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Outfit', 'var(--font-noto)', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Geist Mono', 'ui-monospace', 'monospace'],
        signika: ['var(--font-signika)', 'Signika', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', '"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-saffron': '0 0 25px -5px rgba(249, 115, 22, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'fade-in': 'simpleFadeIn 0.3s ease-out forwards',
        'pulse-bar': 'pulseBar 1.5s ease-in-out infinite',
        'pulse-bar-delay': 'pulseBarShort 1.5s ease-in-out 0.2s infinite',
        'pulse-bar-delay2': 'pulseBar 1.5s ease-in-out 0.4s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        simpleFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseBar: {
          '0%, 100%': { 
            height: '24px',
            opacity: '0.6'
          },
          '50%': { 
            height: '12px',
            opacity: '0.2'
          }
        },
        pulseBarShort: {
          '0%, 100%': { 
            height: '16px',
            opacity: '0.6'
          },
          '50%': { 
            height: '8px',
            opacity: '0.2'
          }
        },
        glow: {
          '0%, 100%': { 
            opacity: '0.5',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.1)'
          }
        }
      }
    },
  },
  plugins: [],
};
