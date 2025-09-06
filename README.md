# Event Management System

A mini event management system built with Next.js 15, TypeScript, and Tailwind CSS.

## Features
- View upcoming events with title, date, location, and category  
- Search events by title  
- Filter events by category (Conference, Workshop, Meetup, etc.)  
- View detailed event page with full description  
- Create new events via a form  
- Store user-created events in localStorage (persistent per browser)  
- Manage personal events in "My Events" page  
- Delete user-created events  
- Dynamic routing for event details (`/events/[id]`)  
- Responsive UI with clean layout and navigation  

## Technology
- Next.js
- TypeScript
- Tailwind

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

