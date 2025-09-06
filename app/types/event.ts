export interface Event {
  id: string;           
  title: string;        
  description: string;  
  date: string;         
  location: string;     
  category: "Conference" | "Workshop" | "Meetup" | "Other"; 
  createdAt?: string;    
  updatedAt?: string;    
  rsvpCount?: number;    
  isUserEvent?: boolean; 
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  location: string;
  category: "Conference" | "Workshop" | "Meetup" | "Other";
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  category?: "Conference" | "Workshop" | "Meetup" | "Other";
}
