import CreateEventForm from '@/app/components/events/CreateEventForm';

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <CreateEventForm />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Create Event | Event Manager',
  description: 'Create a new event and share it with the community.',
};
