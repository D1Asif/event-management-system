'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/app/types/event';
import { isUserRSVPed, addUserRSVP, removeUserRSVP } from '@/app/utils/localStorage';

interface RSVPButtonProps {
  event: Event;
}

export default function RSVPButton({ event }: RSVPButtonProps) {
  const [isRsvped, setIsRsvped] = useState(false);
  const [isRsvping, setIsRsvping] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(event.rsvpCount || 0);

  useEffect(() => {
    setIsRsvped(isUserRSVPed(event.id));
  }, [event.id]);

  const handleRSVP = async () => {
    try {
      setIsRsvping(true);

      if (isRsvped) {
        // Cancel RSVP
        const response = await fetch(`/api/events/${event.id}/rsvp`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
          removeUserRSVP(event.id);
          setIsRsvped(false);
          setRsvpCount(data.data.rsvpCount);
        } else {
          alert(data.error || 'Failed to cancel RSVP');
        }
      } else {
        // RSVP to event
        const response = await fetch(`/api/events/${event.id}/rsvp`, {
          method: 'POST',
        });

        const data = await response.json();

        if (data.success) {
          addUserRSVP(event.id);
          setIsRsvped(true);
          setRsvpCount(data.data.rsvpCount);
        } else {
          alert(data.error || 'Failed to RSVP');
        }
      }
    } catch (error) {
      console.error('Error handling RSVP:', error);
      alert('Failed to RSVP. Please try again.');
    } finally {
      setIsRsvping(false);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Join This Event</h3>
      <button 
        onClick={handleRSVP}
        disabled={isRsvping}
        className={`w-full cursor-pointer py-3 px-4 rounded-xl font-medium transition-all duration-200 mb-3 ${
          isRsvped 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
        } disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md`}
      >
        {isRsvping ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {isRsvped ? 'Cancelling...' : 'RSVPing...'}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isRsvped ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              )}
            </svg>
            {isRsvped ? 'Cancel RSVP' : 'RSVP Now'}
          </div>
        )}
      </button>
      <p className="text-sm text-gray-500 text-center">
        {rsvpCount ? `${rsvpCount} people are attending` : 'Be the first to RSVP'}
      </p>
    </div>
  );
}
