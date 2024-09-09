import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() name: string = ''; // Default empty string
  @Input() icon: string = ''; // Default empty string
  // activeButton: string = ''; // Track which button is active ('adm' or 'wxm')
  @Input() activeButton: string = ''; // Receive the active button from parent
  @Output() activeChange = new EventEmitter<string>(); // Emit active button change

  // Method to emit the button clicked event
  setActive(button: string) {
    this.activeChange.emit(button);
  }
}
