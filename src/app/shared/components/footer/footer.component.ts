import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(private router: Router) {}


 // Check if the route is active
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  // Navigate to the specified route
  navigateTo(path:string){
    this.router.navigate([path]);
  }
}
