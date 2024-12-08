import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs'; // Import Subscription for managing the observer lifecycle

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Corrected to styleUrls (plural)
})
export class HeaderComponent implements OnDestroy {
  headerText: string = '';
  private routerSubscription: Subscription; // Track the router subscription

  constructor(private router: Router) {
    // Subscription to router events should be set up in the constructor or ngOnInit
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderText(event.url);
      }
    });
  }

  ngOnInit(): void {
    this.updateHeaderText(this.router.url); // Set initial header text on component load
  }

  ngOnDestroy(): void {
    // Unsubscribe from router events to avoid memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  // Mapping of routes to header text
  private routeHeaderMapping: { [key: string]: string } = {
    '/attendance': 'Attendance Management',
    '/staff': 'Staff Management'
  };

  // Update header text based on the current route
  updateHeaderText(route: string): void {
    this.headerText = this.routeHeaderMapping[route] || ''; // Default to an empty string if route is not mapped
  }
}
