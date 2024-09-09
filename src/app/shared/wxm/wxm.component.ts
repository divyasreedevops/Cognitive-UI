import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wxm',
  templateUrl: './wxm.component.html',
  styleUrl: './wxm.component.scss'
})
export class WxmComponent {
  @Input() isActive: boolean = false;

  // toggleActive() {
  //   this.isActive = !this.isActive;
  // }

}
