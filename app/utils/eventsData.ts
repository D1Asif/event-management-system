import { Event } from '@/app/types/event';
import fs from 'fs';
import path from 'path';

const EVENTS_FILE_PATH = path.join(process.cwd(), 'data', 'events.json');

// Read events from JSON file
export async function readEvents(): Promise<Event[]> {
  try {
    const fileContent = fs.readFileSync(EVENTS_FILE_PATH, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading events file:', error);
    return [];
  }
}

// Write events to JSON file
export async function writeEvents(events: Event[]): Promise<void> {
  try {
    fs.writeFileSync(EVENTS_FILE_PATH, JSON.stringify(events, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing events file:', error);
    throw error;
  }
}

// Helper function to find event by ID
export async function findEventById(id: string): Promise<Event | undefined> {
  const events = await readEvents();
  return events.find(event => event.id === id);
}

// Helper function to update event in JSON file
export async function updateEventInFile(updatedEvent: Event): Promise<void> {
  const events = await readEvents();
  const index = events.findIndex(event => event.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
    await writeEvents(events);
  }
}

// Helper function to delete event from JSON file
export async function deleteEventFromFile(id: string): Promise<boolean> {
  const events = await readEvents();
  const index = events.findIndex(event => event.id === id);
  if (index !== -1) {
    events.splice(index, 1);
    await writeEvents(events);
    return true;
  }
  return false;
}

// Helper function to add event to JSON file
export async function addEventToFile(newEvent: Event): Promise<void> {
  const events = await readEvents();
  events.push(newEvent);
  await writeEvents(events);
}
