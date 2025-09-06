import { Event } from '@/app/types/event';
import EventCard from './EventCard';

interface EventListProps {
  events: Event[];
  title?: string;
  showSearchAndFilter?: boolean;
  searchTerm?: string;
  selectedCategory?: string;
  onSearchChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
}

export default function EventList({
  events,
  title = "Upcoming Events",
  showSearchAndFilter = true,
  searchTerm = '',
  selectedCategory = 'All',
  onSearchChange,
  onCategoryChange
}: EventListProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Results Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-light text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-gray-600">
          {events.length} event{events.length !== 1 ? 's' : ''} found
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-2xl p-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No events are currently available.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
