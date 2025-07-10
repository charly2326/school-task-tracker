# School Task Management App - Replit Guide

## Overview

This is a full-stack school task management application called "MisCosas" (My Things in Spanish) designed for students to organize their weekly school tasks. The application features a modern React frontend with a Express.js backend, using PostgreSQL for data persistence and styled with Tailwind CSS and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Comprehensive set of Radix UI primitives through shadcn/ui

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints under `/api` prefix
- **Development**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL (configured for use with Neon Database serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Fallback**: In-memory storage implementation for development

## Key Components

### Database Schema
The application uses two main tables:
- **Subjects**: Store academic subjects with name, color, and icon
- **Tasks**: Store individual tasks with title, description, subject reference, due date, and completion status

### Frontend Components
- **Header**: Navigation bar with app branding and user profile
- **WeeklyCalendar**: Interactive weekly view showing tasks for each day
- **TaskList**: Display and manage tasks for selected dates
- **SubjectSidebar**: Subject overview with progress tracking
- **TaskModal**: Form for creating new tasks
- **UI Components**: Complete shadcn/ui component library for consistent design

### Backend Routes
- `GET /api/subjects` - Retrieve all subjects
- `GET /api/tasks` - Retrieve all tasks with subject information
- `GET /api/tasks/date/:date` - Get tasks for specific date
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task (completion status)
- `DELETE /api/tasks/:id` - Delete task

## Data Flow

1. **Client Requests**: Frontend makes HTTP requests to backend API endpoints
2. **Server Processing**: Express server handles requests and validates data using Zod schemas
3. **Database Operations**: Drizzle ORM performs type-safe database operations
4. **Response Handling**: Server returns JSON responses with proper error handling
5. **State Management**: TanStack Query manages caching, synchronization, and optimistic updates
6. **UI Updates**: React components re-render based on query state changes

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: react, react-dom, @tanstack/react-query
- **Backend**: express, drizzle-orm, @neondatabase/serverless
- **Development**: vite, tsx, typescript, tailwindcss
- **UI Library**: Complete shadcn/ui component set with Radix UI primitives

### Database Integration
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Neon Database**: Serverless PostgreSQL for production deployment
- **Connection**: Environment variable based database URL configuration

### Styling and Design
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **shadcn/ui**: Pre-built accessible components with consistent design system
- **Lucide React**: Icon library for consistent iconography

## Deployment Strategy

### Development Mode
- Frontend served by Vite dev server with hot module replacement
- Backend runs with tsx for TypeScript execution
- In-memory storage fallback when database not available
- Integrated error overlay for development debugging

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Database: Drizzle migrations ensure schema consistency
- Environment: Production configuration with proper database connection

### Database Management
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Migrations**: Generated to `./migrations` directory
- **Commands**: `npm run db:push` for schema updates
- **Type Safety**: Automatic TypeScript types generated from schema

The application is designed to be a complete, production-ready school task management system with modern development practices, type safety throughout the stack, and a responsive, accessible user interface.