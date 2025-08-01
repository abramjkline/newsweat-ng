import { Component, OnInit } from '@angular/core';
import { SafeHtmlPipe } from '../safe-html.pipe'; // Adjust path if needed
import { CommonModule } from '@angular/common';
import {provideHttpClient} from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [SafeHtmlPipe, CommonModule
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
], // If you're using standalone components
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  calendarEmbedUrl: string = '';
  upcomingEvents: any[] = [];
  loadingEvents: boolean = true;
  errorLoadingEvents: boolean = false;

  ngOnInit(): void {
    // Replace with your actual Google Calendar embed URL
    this.calendarEmbedUrl = 'https://calendar.google.com/calendar/embed?src=111677646947905268447%40group.calendar.google.com&ctz=America%2FNew_York';
  } 
}