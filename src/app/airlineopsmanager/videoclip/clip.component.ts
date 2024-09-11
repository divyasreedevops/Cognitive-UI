import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class VideoClipComponent implements OnInit {

  constructor(private router: Router) {}
timeoutId:any;
  ngOnInit(): void {
    this.timeoutId = setTimeout(() => {
      this.router.navigate(['/multimaps']); 
    }, 3000);
  }


  ngOnDestroy(): void {
    // Clear the timeout when the component is destroyed
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
