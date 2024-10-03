import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class VideoClipComponent implements OnInit {
  activeTab:any='';

  constructor(private router: Router) {}
timeoutId:any;
  ngOnInit(): void {
    this.activeTab = localStorage.getItem('activeNav');
    if(this.activeTab){
        console.log(this.activeTab,"*********************")
      switch(this.activeTab){

        case 'ADM':
          this.timeoutId = setTimeout(() => {
            this.router.navigate(['/ADM']); 
          }, 3000);
          break;
        case 'NOTAM Management':
          this.timeoutId = setTimeout(() => {
            this.router.navigate(['/NOTAM-Management']);
          }, 3000);
          break;
          case 'WxM':
          this.timeoutId = setTimeout(() => {
            this.router.navigate(['/weather']);
          }, 3000);
          break;
      }
    }
  }


  ngOnDestroy(): void {
    // Clear the timeout when the component is destroyed
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
