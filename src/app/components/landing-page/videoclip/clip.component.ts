import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class VideoClipComponent implements OnInit {
  activeTab:any=''; // Variable to hold the currently active tab from local storage

  // Constructor to inject the Router service for navigation
  constructor(private router: Router) {}
timeoutId:any; // Variable to store the timeout ID for navigation delay

 // Lifecycle hook executed when the component is initialized
  ngOnInit(): void {
    // Retrieve the active tab from local storage, if set
    this.activeTab = localStorage.getItem('activeNav');
    if(this.activeTab){
        console.log(this.activeTab,"*********************")
      switch(this.activeTab){

        case 'ADM':
           // Delay navigation to '/ADM' by 3 seconds
          this.timeoutId = setTimeout(() => {
            this.router.navigate(['/ADM']); 
          }, 3000);
          break;
        case 'NOTAM Management':
          // Delay navigation to '/NOTAM-Management' by 3 seconds
          this.timeoutId = setTimeout(() => {
            this.router.navigate(['/NOTAM-Management']);
          }, 3000);
          break;
          case 'WxM':
            // Delay navigation to '/weather' by 3 seconds
          this.timeoutId = setTimeout(() => {
            this.router.navigate(['/weather']);
          }, 3000);
          break;
          case 'APM':
            // Delay navigation to '/APM' by 3 seconds
          this.timeoutId = setTimeout(() => {
            this.router.navigate(['/APM']);
          }, 3000);
          break;
      }
    }
  }

  // Lifecycle hook executed when the component is destroyed
  ngOnDestroy(): void {
    // Clear the navigation timeout to prevent unintended routing if the component is destroyed
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
