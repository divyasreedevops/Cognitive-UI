import { Component } from '@angular/core';

@Component({
  selector: 'app-weather-popup',
  templateUrl: './weather-popup.component.html',
  styleUrl: './weather-popup.component.scss'
})
export class WeatherPopupComponent {
  showPopup = false;

  menuItems = [
    { label: 'Radar', icon: 'radar' },
    { label: 'Clouds', icon: 'cloud' },
    { label: 'Satellite', icon: 'satellite' },
    { label: 'Precipitation', icon: 'umbrella' },
    { label: 'Temperature', icon: 'thermostat' },
    { label: 'Wind Speed', icon: 'air' },
    { label: 'Humidity', icon: 'water_drop' },
    { label: 'Air Pressure', icon: 'compress' },
    { label: 'Thunderstorm', icon: 'bolt' },
    { label: 'Sea', icon: 'waves' },
    { label: 'Snow', icon: 'ac_unit' }
  ];

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  handleOptionClick(item: any) {
    console.log(`${item.label} clicked`);
    this.invokeMethod(item.label);
  }

  invokeMethod(selectedOption: string) {
    // Handle the option click here
    console.log('Invoking method for:', selectedOption);
    // Add your logic here
  }
}
