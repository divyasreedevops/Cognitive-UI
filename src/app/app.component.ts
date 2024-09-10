import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Demo';
  headerName = 'Cognitive Navigation';
  headerIcon = 'assets/images/logo.png';
  activeButton: string = ''; // Track which button is active

  setActive(button: string) {
    this.activeButton = button;
  }
}
