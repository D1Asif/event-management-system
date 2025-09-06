'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/app/types/event';
import { getUserEvents } from '@/app/utils/localStorage';
import EventCard from '@/app/components/events/EventCard';

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user event IDs from localStorage
      const userEvents = getUserEvents();
      const userEventIds = userEvents.map(event => event.id);

      if (userEventIds.length === 0) {
        setEvents([]);
        return;
      }

      // Fetch all events and filter for user events
      const response = await fetch('/api/events');
      const data = await response.json();

      if (data.success) {
        // Filter events to only show user's events
        const userEvents = data.data.filter((event: Event) => 
          userEventIds.includes(event.id)
        );
        setEvents(userEvents);
      } else {
        setError(data.error || 'Failed to fetch events');
      }
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching user events:', err);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading your events...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Events</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchUserEvents}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            My Events
          </h1>
          <p className="text-gray-600">
            Manage and view all the events you&apos;ve created.
          </p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Created Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven&apos;t created any events yet. Create your first event to get started!
              </p>
              <a
                href="/create-event"
                className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-200"
              >
                Create Your First Event
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
