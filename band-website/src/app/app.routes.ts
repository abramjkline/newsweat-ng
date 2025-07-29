import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BandBioComponent } from './band-bio/band-bio.component';
import { MusicComponent } from './music/music.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PhotosComponent } from './photos/photos.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'bio', component: BandBioComponent },
  { path: 'music', component: MusicComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
