'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Event, UpdateEventRequest } from '@/app/types/event';

interface EditEventFormProps {
  event: Event;
  onSubmit?: (event: Event) => void;
}

export default function EditEventForm({ event, onSubmit }: EditEventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<UpdateEventRequest>({
    title: event.title,
    description: event.description,
    date: event.date.slice(0, 16), // Convert to datetime-local format
    location: event.location,
    category: event.category
  });
  
  const [errors, setErrors] = useState<Partial<UpdateEventRequest>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'Conference', label: 'Conference' },
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Meetup', label: 'Meetup' },
    { value: 'Other', label: 'Other' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<UpdateEventRequest> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.date = 'Event date must be in the future';
      }
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert datetime-local back to ISO string
      const updateData = {
        ...formData,
        date: new Date(formData.date!).toISOString()
      };

      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        // Call custom onSubmit if provided
        if (onSubmit) {
          onSubmit(data.data);
        } else {
          // Default behavior: redirect to My Events
          router.push('/my-events');
        }
      } else {
        // Handle API errors
        setErrors({ title: data.error || 'Failed to update event' });
      }
    } catch (error) {
      console.error('Error updating event:', error);
      setErrors({ title: 'Failed to update event. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof UpdateEventRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-light text-gray-900 mb-2">Edit Event</h2>
        <p className="text-gray-600">Update the details of your event.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
              errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="Enter event title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 resize-none ${
              errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="Describe your event"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Date and Location Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              id="date"
              value={formData.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                errors.date ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              value={formData.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                errors.location ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="Enter event location"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            value={formData.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white ${
              errors.category ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Update Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
