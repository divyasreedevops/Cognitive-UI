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

  private navElement: HTMLElement | null = null;
  navInfo: any = {
    isTabActive:false,
    navBtn:[
      {
        icon_url:'assets/icons/6.png',
        icon_name:'ADM',
      },
      {
        icon_url:'assets/icons/7.png',
        icon_name:'WxM',
      },
      {
        icon_url:'assets/icons/4.png',
        icon_name:'APM',
      },
      {
        icon_url:'assets/icons/5.png',
        icon_name:'Airworthiness',
      },
      {
        icon_url:'assets/icons/1.png',
        icon_name:'FPM',
      },
      {
        icon_url:'assets/icons/2.png',
        icon_name:'NOTAM Management',
      },
      {
        icon_url:'assets/icons/8.png',
        icon_name:'Aircraft Tracking',
      },
      {
        icon_url:'assets/icons/triangle.png',
        icon_name:'Dashboard & Reports',
      }
    ],
    navTitle:'AIRLINE OPS MANAGER'
  };

  // Method to emit the button clicked event
  setActive(button: string) {
    this.activeChange.emit(button);
  }
  toggleNavbar() {
    this.isHeaderOpen = !this.isHeaderOpen;
  }


 
}
// keyboard_arrow_down
