import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleCalendarService, CalendarEvent } from '../services/googlecalendar.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  upcomingEvents: CalendarEvent[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private googleCalendarService: GoogleCalendarService) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.googleCalendarService.getUpcomingEvents().subscribe({
      next: (events) => {
        this.upcomingEvents = events;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to fetch events.';
        this.isLoading = false;
        console.error('Component error:', error);
      }
    });
  }

  /**
   * Extracts the first URL found in an event's description.
   * @param description The event description string.
   * @returns A URL string or null if not found.
   */

  extractUrlFromDescription(description: string | undefined): string | null {
    if (!description) {
      return null;
    }
    // Simple regex to find the first http or https URL
    const urlRegex = /(https?:\/\/[^\s"<]+)/g;
    const found = description.match(urlRegex);
    return found ? found[0] : null;
  }

  /**
   * Creates a Google Maps search link from a location string.
   * @param location The location string from the event.
   * @returns A URL for Google Maps or null if no location.
   */
  createGoogleMapsLink(location: string | undefined): string | null {
    if (!location) {
      return null;
    }
    // URL-encodes the location for the query parameter
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  }

  // Helper function to format dates for display
  formatEventTime(event: CalendarEvent): string {
    if (event.start.dateTime && event.end.dateTime) {
      // For specific date and time
      const startDate = new Date(event.start.dateTime);
      const endDate = new Date(event.end.dateTime);
      
      const datePart = startDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      const startTime = startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });

      const endTime = endDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      
      return `${datePart}, ${startTime} - ${endTime}`;
    }

// For all-day events (only date available)
else if (event.start.date) {
    // Parse the date string 'YYYY-MM-DD'
    const dateString = event.start.date;
    const parts = dateString.split('-');
    
    // Construct a new Date object using local time zone, avoiding UTC conversion
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const day = parseInt(parts[2], 10);
    
    const date = new Date(year, month, day);

    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    }) + ' (All Day)';
}

    return '';
  }
}