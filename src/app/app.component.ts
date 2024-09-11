import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'Demo';
  // headerName = 'Cognitive Navigation';
  // headerIcon = 'assets/images/logo.png';
  activeButton: string = ''; // Track which button is active
  constructor(public router: Router) {}

  setActive(button: string) {
    this.activeButton = button;
  }

  // Check if the current route is login
  isLoginRoute(): boolean {
    const hiddenRoutes = ['/login', '/opsmanager']; // Add your paths here
    return hiddenRoutes.includes(this.router.url); // Check if the current URL is one of the hidden routes
  }
}
