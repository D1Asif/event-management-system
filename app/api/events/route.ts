import { NextRequest, NextResponse } from 'next/server';
import { Event, CreateEventRequest } from '@/app/types/event';
import { readEvents, addEventToFile } from '@/app/utils/eventsData';

// GET /api/events - Get all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const events = await readEvents();
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

    // Get existing events to generate new ID
    const existingEvents = await readEvents();
    
    // Create new event
    const newEvent: Event = {
      id: (existingEvents.length + 1).toString(),
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

    await addEventToFile(newEvent);

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
