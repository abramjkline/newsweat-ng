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

  // Helper function to format dates for display
  formatEventTime(event: CalendarEvent): string {
    if (event.start.dateTime) {
      // For specific date and time
      const date = new Date(event.start.dateTime);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    } else if (event.start.date) {
      // For all-day events (only date available)
      const date = new Date(event.start.date);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }) + ' (All Day)';
    }
    return 'Date/Time TBA';
  }
}