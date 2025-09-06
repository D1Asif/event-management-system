import { notFound } from 'next/navigation';
import EditEventForm from '@/app/components/events/EditEventForm';
import { Event } from '@/app/types/event';
import { isUserEvent } from '@/app/utils/localStorage';

interface EditEventPageProps {
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

export default async function EditEventPage({ params }: EditEventPageProps) {
  const event = await getEvent(params.id);

  if (!event) {
    notFound();
  }

  // Check if this is a user event (client-side check will be done in the form)
  // For now, we'll allow access and let the form handle the validation

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <EditEventForm event={event} />
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: EditEventPageProps) {
  const event = await getEvent(params.id);

  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    };
  }

  return {
    title: `Edit ${event.title} | Event Manager`,
    description: `Edit the details of ${event.title}`,
  };
}
