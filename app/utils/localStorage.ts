'use client';

const USER_EVENTS_KEY = 'userEvents';

export interface UserEvent {
  id: string;
  createdAt: string;
}

export function getUserEvents(): UserEvent[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(USER_EVENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

export function addUserEvent(eventId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const userEvents = getUserEvents();
    const newEvent: UserEvent = {
      id: eventId,
      createdAt: new Date().toISOString()
    };
    
    const updatedEvents = [...userEvents, newEvent];
    localStorage.setItem(USER_EVENTS_KEY, JSON.stringify(updatedEvents));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function removeUserEvent(eventId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const userEvents = getUserEvents();
    const updatedEvents = userEvents.filter(event => event.id !== eventId);
    localStorage.setItem(USER_EVENTS_KEY, JSON.stringify(updatedEvents));
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

export function isUserEvent(eventId: string): boolean {
  const userEvents = getUserEvents();
  return userEvents.some(event => event.id === eventId);
}

// RSVP tracking functions
const USER_RSVPS_KEY = 'userRsvps';

export interface UserRSVP {
  eventId: string;
  rsvpDate: string;
}

export function getUserRSVPs(): UserRSVP[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(USER_RSVPS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading RSVPs from localStorage:', error);
    return [];
  }
}

export function addUserRSVP(eventId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const userRsvps = getUserRSVPs();
    const newRSVP: UserRSVP = {
      eventId,
      rsvpDate: new Date().toISOString()
    };
    
    // Check if already RSVPed
    if (!userRsvps.some(rsvp => rsvp.eventId === eventId)) {
      const updatedRsvps = [...userRsvps, newRSVP];
      localStorage.setItem(USER_RSVPS_KEY, JSON.stringify(updatedRsvps));
    }
  } catch (error) {
    console.error('Error saving RSVP to localStorage:', error);
  }
}

export function removeUserRSVP(eventId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const userRsvps = getUserRSVPs();
    const updatedRsvps = userRsvps.filter(rsvp => rsvp.eventId !== eventId);
    localStorage.setItem(USER_RSVPS_KEY, JSON.stringify(updatedRsvps));
  } catch (error) {
    console.error('Error removing RSVP from localStorage:', error);
  }
}

export function isUserRSVPed(eventId: string): boolean {
  const userRsvps = getUserRSVPs();
  return userRsvps.some(rsvp => rsvp.eventId === eventId);
}
