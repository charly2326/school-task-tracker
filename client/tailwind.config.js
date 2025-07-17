/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores base
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        
        // Colores de fin de semana
        saturday: {
          DEFAULT: 'hsl(var(--saturday))',
          light: 'hsl(218, 70%, 95%)',
          dark: 'hsl(218, 70%, 65%)'
        },
        sunday: {
          DEFAULT: 'hsl(var(--sunday))',
          light: 'hsl(0, 70%, 95%)',
          dark: 'hsl(0, 70%, 65%)'
        },
        
        // Colores de materias
        math: 'hsl(var(--math))',
        science: 'hsl(var(--science))',
        language: 'hsl(var(--language))',
        history: 'hsl(var(--history))',
        art: 'hsl(var(--art))',
        pe: 'hsl(var(--pe))'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}


