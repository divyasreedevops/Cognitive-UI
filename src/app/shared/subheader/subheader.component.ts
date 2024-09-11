import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.scss'
})
export class SubheaderComponent {
  @Input() isActive: boolean = false;
  @Input() icon: string = '';
  @Input() name: string = '';
}
