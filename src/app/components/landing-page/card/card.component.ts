import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  // Inputs to receive data from the parent component
  @Input() icon: string | undefined; // The icon class or URL for the card (optional)
  @Input() title: string | undefined; // Title displayed on the card (optional)
  @Input() description: string | undefined; // Description text displayed on the card (optional)
  @Input() router: string | undefined; // Router link or URL for the card's navigation (optional)

  // Output event emitter to notify parent component when the card is selected
  @Output() cardSelected = new EventEmitter<string>(); // Emits the title of the selected card

  // Function that is triggered when the card is clicked
  onCardClick() {
    this.cardSelected.emit(this.title); // Emits the card's title to the parent component
  }
}
