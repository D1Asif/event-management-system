import { NextRequest, NextResponse } from 'next/server';
import { events } from '../../route';

// POST /api/events/[id]/rsvp - RSVP to an event
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Event ID is required'
      }, { status: 400 });
    }

    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Event not found'
      }, { status: 404 });
    }

    // Increment RSVP count
    events[eventIndex].rsvpCount = (events[eventIndex].rsvpCount || 0) + 1;
    events[eventIndex].updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      data: events[eventIndex],
      message: 'RSVP successful'
    }, { status: 200 });

  } catch (error) {
    console.error('Error RSVPing to event:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to RSVP to event'
    }, { status: 500 });
  }
}

// DELETE /api/events/[id]/rsvp - Cancel RSVP
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Event ID is required'
      }, { status: 400 });
    }

    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Event not found'
      }, { status: 404 });
    }

    // Decrement RSVP count (minimum 0)
    events[eventIndex].rsvpCount = Math.max((events[eventIndex].rsvpCount || 0) - 1, 0);
    events[eventIndex].updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      data: events[eventIndex],
      message: 'RSVP cancelled'
    }, { status: 200 });

  } catch (error) {
    console.error('Error cancelling RSVP:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to cancel RSVP'
    }, { status: 500 });
  }
}
