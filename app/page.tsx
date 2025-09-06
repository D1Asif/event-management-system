export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import HeroSection from './components/HeroSection';
import EventListWithSearch from './components/events/EventListWithSearch';
import { Event } from './types/event';

async function getEvents(search?: string, category?: string): Promise<Event[]> {
  try {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category && category !== 'All') params.set('category', category);

    const queryString = params.toString();
    const url = `http://localhost:3000/api/events${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      cache: 'no-store' // Ensure fresh data on each request
    });
    const data = await response.json();

    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <HeroSection />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <EventListWithSearch initialEvents={events} />
      </Suspense>
    </div>
  );
}
