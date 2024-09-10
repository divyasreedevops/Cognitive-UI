import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class VideoClipComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Redirect after 3 seconds
    setTimeout(() => {
      this.router.navigate(['/multimaps']); // Replace '/another-route' with your desired route
    }, 3000);
  }

  onLoadedMetadata(video: HTMLVideoElement): void {
    video.play();
  }
}
