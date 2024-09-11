import { Component, EventEmitter, Input, Output} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '*',
        opacity: 1,
      })),
      state('out', style({
        height: '0',
        opacity: 0,
      })),
      transition('in => out', [
        animate('300ms ease-in-out')
      ]),
      transition('out => in', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class HeaderComponent {
  isHeaderOpen = true;
  @Input() name: string = ''; // Default empty string
  @Input() icon: string = ''; // Default empty string
  // activeButton: string = ''; // Track which button is active ('adm' or 'wxm')
  @Input() activeButton: string = ''; // Receive the active button from parent
  @Output() activeChange = new EventEmitter<string>(); // Emit active button change
  @Input() navInfo:any={};
 

  // Method to emit the button clicked event
  setActive(button: string) {
    this.activeChange.emit(button);
  }
  toggleNavbar() {
    this.isHeaderOpen = !this.isHeaderOpen;
  }


 
}
// keyboard_arrow_down
