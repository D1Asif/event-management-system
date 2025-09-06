# Event Management System

A mini event management system built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

### Module 1: Project Setup & Layout ✅
- **Header Navigation**: Clean navigation bar with Home, Create Event, and My Events links
- **Responsive Design**: Mobile-friendly navigation with hamburger menu
- **Active State**: Visual indication of current page in navigation
- **Modern UI**: Clean, professional design using Tailwind CSS

#### Components Created:
- `Header.tsx`: Main navigation component with responsive design
- Updated `layout.tsx`: Integrated header into the main layout
- Updated `page.tsx`: Welcome page with feature overview

#### Technical Implementation:
- Uses Next.js App Router for navigation
- Client-side navigation with `usePathname` hook for active state
- Responsive design with mobile-first approach
- TypeScript for type safety
- Tailwind CSS for styling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── api/
│   └── events/
│       ├── route.ts         # GET all, POST new
│       └── [id]/
│           └── route.ts     # GET by id, DELETE, PATCH
├── components/
│   └── Header.tsx          # Navigation header
├── types/
│   └── event.ts            # Event interfaces and types
├── layout.tsx              # Root layout with header
├── page.tsx               # Home page
└── globals.css            # Global styles
```

### API Endpoints ✅
- **RESTful API**: Complete CRUD operations for events
- **TypeScript Support**: Full type safety with Event interface
- **Mock Data**: In-memory JSON array with sample events
- **Error Handling**: Proper HTTP status codes and error messages
- **Validation**: Input validation for all endpoints

#### Available Endpoints:
- `GET /api/events` - Get all events (with optional filtering)
- `POST /api/events` - Create a new event
- `GET /api/events/[id]` - Get a single event by ID
- `DELETE /api/events/[id]` - Delete an event by ID
- `PATCH /api/events/[id]` - Update an event by ID

#### Event Schema:
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: "Conference" | "Workshop" | "Meetup" | "Other";
  createdAt?: string;
  updatedAt?: string;
  rsvpCount?: number;
  isUserEvent?: boolean;
}
```

## Next Steps

- [ ] Module 2: Event List (Home Page)
- [ ] Module 3: Event Details Page
- [ ] Module 4: Create Event Page
- [ ] Module 5: My Events Page