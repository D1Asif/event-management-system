import { NextRequest, NextResponse } from 'next/server';
import { Event, CreateEventRequest } from '@/app/types/event';

// In-memory mock data
export let events: Event[] = [
  {
    id: '1',
    title: 'React Conference 2024',
    description: 'A comprehensive conference covering the latest in React development, including hooks, concurrent features, and performance optimization.',
    date: '2024-03-15T10:00:00Z',
    location: 'San Francisco, CA',
    category: 'Conference',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    rsvpCount: 150,
    isUserEvent: false
  },
  {
    id: '2',
    title: 'TypeScript Workshop',
    description: 'Learn TypeScript from basics to advanced concepts. Hands-on coding sessions and real-world examples.',
    date: '2024-03-20T14:00:00Z',
    location: 'New York, NY',
    category: 'Workshop',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-20T09:00:00Z',
    rsvpCount: 25,
    isUserEvent: false
  },
  {
    id: '3',
    title: 'Tech Meetup',
    description: 'Monthly tech meetup for developers to network and share knowledge. This month\'s topic: AI in Web Development.',
    date: '2024-03-25T18:00:00Z',
    location: 'Austin, TX',
    category: 'Meetup',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z',
    rsvpCount: 45,
    isUserEvent: false
  },
  {
    id: '4',
    title: 'Design System Workshop',
    description: 'Building scalable design systems with Figma and React. Learn best practices for component libraries.',
    date: '2024-04-01T09:00:00Z',
    location: 'Seattle, WA',
    category: 'Workshop',
    createdAt: '2024-02-01T11:00:00Z',
    updatedAt: '2024-02-01T11:00:00Z',
    rsvpCount: 30,
    isUserEvent: false
  },
  {
    id: '5',
    title: 'Startup Pitch Night',
    description: 'Watch innovative startups pitch their ideas to investors. Networking event for entrepreneurs and investors.',
    date: '2024-04-05T19:00:00Z',
    location: 'Boston, MA',
    category: 'Other',
    createdAt: '2024-02-05T12:00:00Z',
    updatedAt: '2024-02-05T12:00:00Z',
    rsvpCount: 80,
    isUserEvent: false
  }
];

// GET /api/events - Get all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filteredEvents = [...events];

    // Filter by category if provided
    if (category && category !== 'All') {
      filteredEvents = filteredEvents.filter(event => event.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }

    // Sort by date (upcoming events first)
    filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({
      success: true,
      data: filteredEvents,
      count: filteredEvents.length
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch events'
    }, { status: 500 });
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body: CreateEventRequest = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.date || !body.location || !body.category) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, description, date, location, category'
      }, { status: 400 });
    }

    // Validate category
    const validCategories = ['Conference', 'Workshop', 'Meetup', 'Other'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid category. Must be one of: Conference, Workshop, Meetup, Other'
      }, { status: 400 });
    }

    // Validate date format
    const eventDate = new Date(body.date);
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json({
        success: false,
        error: 'Invalid date format'
      }, { status: 400 });
    }

    // Create new event
    const newEvent: Event = {
      id: (events.length + 1).toString(),
      title: body.title.trim(),
      description: body.description.trim(),
      date: body.date,
      location: body.location.trim(),
      category: body.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rsvpCount: 0,
      isUserEvent: true
    };

    events.push(newEvent);

    return NextResponse.json({
      success: true,
      data: newEvent,
      message: 'Event created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create event'
    }, { status: 500 });
  }
}
