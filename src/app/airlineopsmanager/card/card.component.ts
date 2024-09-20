import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() icon: string | undefined; // Changed type to string for the class
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() router: string | undefined;
  @Output() cardSelected = new EventEmitter<string>();

  onCardClick() {
    this.cardSelected.emit(this.title);
  }
}
