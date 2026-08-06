# PCIU Website - Technology Stack

## Frontend

### Languages
- **TypeScript** - Primary programming language
- **HTML5** - Markup structure
- **CSS3** - Styling (via Tailwind)

### Framework & Libraries
- **React 18** - UI component library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing

### UI & Design
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Pre-built accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **Framer Motion** (via animations) - Micro-interactions
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Tailwind class merging utility

### State Management & Data Fetching
- **TanStack React Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

---

## Backend (Supabase Cloud)

### Database
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Data access control

### Authentication
- **Built-in Auth System** - Email/password authentication
- **Session Management** - JWT-based sessions

### API & Functions
- **Edge Functions** - Serverless backend logic (Deno runtime)
- **RESTful API** - Auto-generated from database schema

### Storage
- **Object Storage** - File uploads and media management

---

## Design System

### Typography
- **Poppins / Inter** - Primary font families
- Custom heading and body text scales

### Color Palette (HSL-based)
- Primary Navy: `222 47% 11%`
- Accent Teal: `175 92% 38%`
- Secondary Sky: `199 84% 55%`
- Highlight Gold: `38 92% 55%`

### Components
- Custom design tokens in `index.css`
- Tailwind configuration in `tailwind.config.ts`
- Reusable UI components in `src/components/ui/`

---

## Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **Git** - Version control

