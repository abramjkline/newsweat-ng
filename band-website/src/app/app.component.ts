import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd, ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router'; // Import Router, etc.
import { Title } from '@angular/platform-browser'; // Import Title service
import { filter, map, mergeMap } from 'rxjs/operators'; // Import RxJS operators
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, MatTooltipModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit { // Implement OnInit
  isNavMenuOpen: boolean = false; // State for the mobile menu

  // Inject Router, ActivatedRoute, and Title service
  
  // Note: @Inject is not necessary if using constructor injection directly
  constructor(
    @Inject(Router) private router: Router,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(Title) private titleService: Title
  ) {}
  
  ngOnInit() {
    // Logic for setting tab title based on route data
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((data) => {
      if (data['title']) {
        this.titleService.setTitle(data['title']);
      }
      // Close mobile menu on route change
      this.closeNavMenu();
    });
  }

  toggleNavMenu() {
    this.isNavMenuOpen = !this.isNavMenuOpen;
  }

  closeNavMenu() {
    this.isNavMenuOpen = false;
  }

  // Optional: Close menu if window is resized above mobile breakpoint
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 768) { // Your mobile breakpoint
      this.closeNavMenu();
    }
  }
}