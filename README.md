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
│           ├── route.ts     # GET by id, DELETE, PATCH
│           └── rsvp/
│               └── route.ts # POST RSVP, DELETE cancel RSVP
├── components/
│   ├── events/
│   │   ├── EventActionButtons.tsx # Client component for edit/delete buttons
│   │   ├── EventCard.tsx   # Server component for event display
│   │   ├── EventList.tsx   # Reusable event list component
│   │   ├── EventListWithSearch.tsx # Client wrapper with search/filter
│   │   └── SearchAndFilter.tsx # Search and filter controls
│   ├── Header.tsx          # Navigation header
│   └── HeroSection.tsx     # Hero section component
├── events/
│   └── [id]/
│       ├── page.tsx        # Dynamic event details page
│       ├── edit/
│       │   └── page.tsx    # Edit event page
│       └── not-found.tsx   # Custom 404 page
├── create-event/
│   └── page.tsx           # Create event page
├── my-events/
│   └── page.tsx           # My events page
├── utils/
│   └── localStorage.ts    # LocalStorage utility functions
├── types/
│   └── event.ts            # Event interfaces and types
├── layout.tsx              # Root layout with header
├── page.tsx               # Home page with event list
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

### Module 2: Event List (Home Page) ✅
- **Event Display**: Clean card-based layout showing event details
- **Search Functionality**: Real-time search by title, description, or location
- **Category Filtering**: Filter events by Conference, Workshop, Meetup, or Other
- **API Integration**: Fetches data from `/api/events` endpoint
- **Responsive Design**: Works seamlessly on all screen sizes
- **Loading States**: Proper loading and error handling

#### Components Created:
- `EventCard.tsx`: Individual event display component
- `SearchAndFilter.tsx`: Search bar and category filter component
- `EventList.tsx`: Reusable event list component (accepts events as props)
- `EventListWithSearch.tsx`: Client wrapper with search/filter functionality
- Updated `page.tsx`: Server-side data fetching with client-side search

#### Features:
- ✅ **Real-time Search**: Instant filtering as you type
- ✅ **Category Filter**: Dropdown to filter by event type
- ✅ **Event Cards**: Clean, modern card design with hover effects
- ✅ **Date Formatting**: Human-readable date and time display
- ✅ **RSVP Count**: Shows attendee count for each event
- ✅ **Empty States**: Helpful messages when no events found
- ✅ **Error Handling**: Graceful error display with retry options

### Module 3: Event Details Page ✅
- **Dynamic Routing**: Dynamic route at `/events/[id]` using Next.js App Router
- **Event Details Display**: Complete event information with modern design
- **Server-Side Rendering**: SEO-friendly with server-side data fetching
- **Navigation**: Back button and clickable event cards
- **Error Handling**: Custom 404 page for non-existent events
- **Metadata Generation**: Dynamic SEO metadata for each event

#### Components Created:
- `EventDetails.tsx`: Main event details display component
- `/events/[id]/page.tsx`: Dynamic route page with server-side data fetching
- `/events/[id]/not-found.tsx`: Custom 404 page for events
- Updated `EventCard.tsx`: Added clickable links to event details

#### Features:
- ✅ **Dynamic Routes**: `/events/[id]` pattern for individual events
- ✅ **Server-Side Data Fetching**: Fast initial page loads
- ✅ **SEO Optimization**: Dynamic metadata generation
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Clickable Cards**: Entire event card is clickable
- ✅ **Back Navigation**: Easy return to events list
- ✅ **Error Handling**: Graceful 404 page for missing events
- ✅ **Event Information**: Complete details including date, location, category
- ✅ **RSVP Functionality**: Placeholder for future RSVP feature

### Module 4: Create Event Page ✅
- **Form Implementation**: Complete form with validation for all required fields
- **API Integration**: POST request to `/api/events` endpoint
- **LocalStorage Management**: Saves user event IDs for tracking
- **Form Validation**: Client-side validation with error messages
- **User Experience**: Loading states and success handling
- **Navigation**: Redirects to My Events page after creation

#### Components Created:
- `CreateEventForm.tsx`: Form component with validation and API integration
- `/create-event/page.tsx`: Create event page
- `localStorage.ts`: Utility functions for managing user events

#### Features:
- ✅ **Form Fields**: Title, description, date, location, category
- ✅ **Validation**: Required fields and future date validation
- ✅ **API Integration**: POST request to create events
- ✅ **LocalStorage**: Tracks user-created events
- ✅ **Error Handling**: Form validation and API error handling
- ✅ **Loading States**: Submit button with loading indicator
- ✅ **Navigation**: Automatic redirect after successful creation

### Module 5: My Events Page ✅
- **User Event Display**: Shows only events created by the user
- **Delete Functionality**: Users can delete their own events
- **LocalStorage Integration**: Uses stored user event IDs
- **API Integration**: DELETE request to remove events
- **Empty State**: Helpful message when no events exist
- **Confirmation**: Delete confirmation dialog

#### Components Created:
- `EditEventForm.tsx`: Form component for editing events
- `EventActionButtons.tsx`: Self-contained client component with edit and delete functionality
- `/events/[id]/edit/page.tsx`: Edit event page
- Updated `EventCard.tsx`: Server component with action buttons integration
- `/my-events/page.tsx`: My events page with management features

#### Features:
- ✅ **User Events Only**: Filters events based on localStorage
- ✅ **Edit Events**: Users can edit their own events
- ✅ **Delete Events**: Users can delete their own events
- ✅ **RSVP Functionality**: Users can RSVP/cancel RSVP to events
- ✅ **RSVP Tracking**: LocalStorage tracks user RSVPs
- ✅ **RSVP Count**: Real-time RSVP count updates
- ✅ **Confirmation Dialog**: Prevents accidental deletions
- ✅ **Loading States**: Delete and RSVP buttons with loading indicators
- ✅ **Empty State**: Encourages users to create their first event
- ✅ **Error Handling**: Graceful error display and retry options
- ✅ **Real-time Updates**: UI updates immediately after changes
- ✅ **Self-contained Components**: EventActionButtons handles all interactions internally
- ✅ **Modern Button Design**: Glassmorphism styling with icons and gradients

## Next Steps

- [ ] Bonus Features: RSVP functionality, event editing
- [ ] Deployment to Vercel