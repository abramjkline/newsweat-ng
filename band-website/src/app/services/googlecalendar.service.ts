import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'; // <--- Import environment

// Define interfaces for type safety (optional but recommended)
export interface CalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: {
    email: string;
    self: boolean;
  };
  organizer: {
    email: string;
    self: boolean;
  };
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  iCalUID: string;
  sequence: number;
  eventType: string;
}

export interface GoogleCalendarResponse {
  kind: string;
  etag: string;
  summary: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: any[];
  nextSyncToken: string;
  items: CalendarEvent[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  // IMPORTANT: For production, do NOT hardcode API keys like this.
  // Use environment variables (Angular's environment.ts) or a server-side proxy.
  private readonly API_KEY = environment.googleApiKey; // Your API Key
  private readonly CALENDAR_ID = 'newsweat@gmail.com'; // Your Calendar ID
  private readonly BASE_URL = `https://www.googleapis.com/calendar/v3/calendars/${this.CALENDAR_ID}/events`;

  constructor(private http: HttpClient) { }

  /**
   * Fetches the next 5 upcoming events from the specified Google Calendar.
   * @returns An Observable of an array of CalendarEvent objects.
   */
  getUpcomingEvents(): Observable<CalendarEvent[]> {
    const now = new Date();
    const timeMin = now.toISOString(); // Get current time in ISO format

    let params = new HttpParams()
      .set('key', this.API_KEY)
      .set('orderBy', 'startTime') // Order by start time
      .set('singleEvents', 'true') // Expand recurring events into individual instances
      .set('timeMin', timeMin) // Only get events from now onwards
      .set('maxResults', '10'); // Limit to 10 results

    return this.http.get<GoogleCalendarResponse>(this.BASE_URL, { params }).pipe(
      map(response => response.items || []), // Extract the events array, default to empty if not found
      catchError(error => {
        console.error('Error fetching Google Calendar events:', error);
        // You can throw a user-friendly error or return an empty array
        return throwError(() => new Error('Could not load calendar events. Please try again later.'));
      })
    );
  }
}
