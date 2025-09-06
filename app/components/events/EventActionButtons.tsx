'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Event } from '@/app/types/event';
import { isUserEvent } from '@/app/utils/localStorage';

interface EventActionButtonsProps {
  event: Event;
}

export default function EventActionButtons({ event }: EventActionButtonsProps) {
  const router = useRouter();
  const [isUserOwnedEvent, setIsUserOwnedEvent] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsUserOwnedEvent(isUserEvent(event.id));
  }, [event.id]);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/events/${event.id}/edit`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);

      const response = await fetch(`/api/events/${event.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Remove from localStorage
        const userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
        const updatedUserEvents = userEvents.filter((userEvent: any) => userEvent.id !== event.id);
        localStorage.setItem('userEvents', JSON.stringify(updatedUserEvents));

        // Refresh the page to update the UI
        window.location.reload();
      } else {
        alert(data.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <div className="space-y-3">
      {/* Edit and Delete buttons - Only for user events */}
      {isUserOwnedEvent ? (
        <>
          <button
            onClick={handleEdit}
            className="w-full cursor-pointer px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
            title="Edit event"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Event
            </div>
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full cursor-pointer px-4 py-3 bg-white/80 backdrop-blur-sm border border-red-200 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete event"
          >
            {isDeleting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Event
              </div>
            )}
          </button>
        </>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">
          You can only edit or delete events you created.
        </p>
      )}
    </div>
  );
}
