'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Event } from '@/app/types/event';
import EventList from './EventList';
import SearchAndFilter from './SearchAndFilter';

interface EventListWithSearchProps {
  initialEvents: Event[];
  title?: string;
}

export default function EventListWithSearch({ 
  initialEvents, 
  title = "Upcoming Events" 
}: EventListWithSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [loading, setLoading] = useState(false);

  // Update URL when search or category changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    if (selectedCategory && selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : '/';
    
    router.replace(newUrl, { scroll: false });
  }, [searchTerm, selectedCategory, router]);

  // Fetch events when search or category changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedCategory && selectedCategory !== 'All') params.set('category', selectedCategory);
        
        const queryString = params.toString();
        const url = `/api/events${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          setEvents(data.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Search and Filter */}
      <SearchAndFilter
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      {/* Event List */}
      <EventList
        events={events}
        title={title}
        showSearchAndFilter={false}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
