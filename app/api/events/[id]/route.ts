import { NextRequest, NextResponse } from 'next/server';
import { Event, UpdateEventRequest } from '@/app/types/event';
import { events } from '../route';

// Helper function to find event by ID
function findEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}

// Helper function to update event in array
function updateEventInArray(updatedEvent: Event): void {
  const index = events.findIndex(event => event.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
  }
}

// Helper function to delete event from array
function deleteEventFromArray(id: string): boolean {
  const index = events.findIndex(event => event.id === id);
  if (index !== -1) {
    events.splice(index, 1);
    return true;
  }
  return false;
}

// GET /api/events/[id] - Get a single event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Event ID is required'
      }, { status: 400 });
    }

    const event = findEventById(id);

    if (!event) {
      return NextResponse.json({
        success: false,
        error: 'Event not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: event
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch event'
    }, { status: 500 });
  }
}

// DELETE /api/events/[id] - Delete an event by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Event ID is required'
      }, { status: 400 });
    }

    const event = findEventById(id);

    if (!event) {
      return NextResponse.json({
        success: false,
        error: 'Event not found'
      }, { status: 404 });
    }

    const deleted = deleteEventFromArray(id);

    if (!deleted) {
      return NextResponse.json({
        success: false,
        error: 'Failed to delete event'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
      data: { id }
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete event'
    }, { status: 500 });
  }
}

// PATCH /api/events/[id] - Update an event by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Event ID is required'
      }, { status: 400 });
    }

    const existingEvent = findEventById(id);

    if (!existingEvent) {
      return NextResponse.json({
        success: false,
        error: 'Event not found'
      }, { status: 404 });
    }

    const body: UpdateEventRequest = await request.json();

    // Validate category if provided
    if (body.category) {
      const validCategories = ['Conference', 'Workshop', 'Meetup', 'Other'];
      if (!validCategories.includes(body.category)) {
        return NextResponse.json({
          success: false,
          error: 'Invalid category. Must be one of: Conference, Workshop, Meetup, Other'
        }, { status: 400 });
      }
    }

    // Validate date format if provided
    if (body.date) {
      const eventDate = new Date(body.date);
      if (isNaN(eventDate.getTime())) {
        return NextResponse.json({
          success: false,
          error: 'Invalid date format'
        }, { status: 400 });
      }
    }

    // Update event with provided fields
    const updatedEvent: Event = {
      ...existingEvent,
      ...body,
      id: existingEvent.id, // Ensure ID cannot be changed
      updatedAt: new Date().toISOString(),
      createdAt: existingEvent.createdAt, // Preserve original creation date
      rsvpCount: existingEvent.rsvpCount, // Preserve RSVP count
      isUserEvent: existingEvent.isUserEvent // Preserve user event flag
    };

    updateEventInArray(updatedEvent);

    return NextResponse.json({
      success: true,
      data: updatedEvent,
      message: 'Event updated successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update event'
    }, { status: 500 });
  }
}
