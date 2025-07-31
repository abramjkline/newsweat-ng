import { TestBed } from '@angular/core/testing';

import { GoogleCalendarService } from './googlecalendar.service';

describe('GooglecalendarService', () => {
  let service: GoogleCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
