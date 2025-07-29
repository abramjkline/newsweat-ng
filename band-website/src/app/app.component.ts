import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router'; // Import Router, etc.
import { Title } from '@angular/platform-browser'; // Import Title service
import { filter, map, mergeMap } from 'rxjs/operators'; // Import RxJS operators

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit { // Implement OnInit
  isNavMenuOpen: boolean = false; // State for the mobile menu

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title // Inject Title service
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