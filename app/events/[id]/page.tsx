import { notFound } from 'next/navigation';
import EventDetails from '@/app/components/events/EventDetails';
import { Event } from '@/app/types/event';

interface EventPageProps {
  params: {
    id: string;
  };
}

async function getEvent(id: string): Promise<Event | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/events/${id}`, {
      cache: 'no-store' // Ensure fresh data on each request
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(params.id);

  if (!event) {
    notFound();
  }

  return <EventDetails event={event} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: EventPageProps) {
  const event = await getEvent(params.id);

  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    };
  }

  return {
    title: `${event.title} | Event Manager`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: 'website',
    },
  };
}
