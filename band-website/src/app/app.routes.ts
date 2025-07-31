import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BandBioComponent } from './band-bio/band-bio.component';
import { MusicComponent } from './music/music.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PhotosComponent } from './photos/photos.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'New Sweat | Home', pathMatch: 'full' },
  { path: 'bio', title: 'New Sweat | Bio', component: BandBioComponent },
  { path: 'music', title: 'New Sweat | Music', component: MusicComponent },
  { path: 'calendar', title: 'New Sweat | Calendar', component: CalendarComponent },
  { path: 'photos', title: 'New Sweat | Photos', component: PhotosComponent },
  { path: 'contact', title: 'New Sweat | Contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
