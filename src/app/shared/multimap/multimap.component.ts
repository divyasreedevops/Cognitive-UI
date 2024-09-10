// import { Component, AfterViewInit } from '@angular/core';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-multimap',
//   templateUrl: './multimap.component.html',
//   styleUrl: './multimap.component.scss'
// })
// export class MultimapComponent implements AfterViewInit {

//   ngAfterViewInit(): void {
//     this.initMaps();
//   }

//   initMaps() {
//     // Map 1: Satellite Map
//     const map1 = L.map('map1').setView([20.5937, 78.9629], 5);  // Coordinates for India
//     L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//       maxZoom: 17,
//     }).addTo(map1);

//     // Map 2: Street Map
//     const map2 = L.map('map2').setView([20.5937, 78.9629], 5);
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//     }).addTo(map2);

//     // Map 3: Dark Map
//     const map3 = L.map('map3').setView([20.5937, 78.9629], 5);
//     L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
//       maxZoom: 19,
//     }).addTo(map3);

//     const map4 = L.map('map4').setView([20.5937, 78.9629], 5);
//     L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="https://carto.com/">CartoDB</a>'
//     }).addTo(map4);

// }
// }

import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-multimap',
  templateUrl: './multimap.component.html',
  styleUrls: ['./multimap.component.scss']
})
export class MultimapComponent implements AfterViewInit {
  private maps: { [key: string]: L.Map } = {}; // Track maps by ID
  constructor(private location: Location,
    private sharedService: SharedService
  ) {}

  ngAfterViewInit(): void {
    this.initMaps();
  }

  initMaps() {
    // Array of map containers
    const mapIds = ['map1', 'map2', 'map3', 'map4'];

    // Loop through map containers and initialize maps
    mapIds.forEach(mapId => {
      const map = L.map(mapId).setView([20.5937, 78.9629], 5);

      let tileLayerUrl: string = '';
      switch (mapId) {
        case 'map1':
          tileLayerUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
          break;
        case 'map2':
          tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
          break;
        case 'map3':
          tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
          break;
        case 'map4':
          tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
          break;
      }

      // Add tile layer to the map
      L.tileLayer(tileLayerUrl, {
        maxZoom: 19,
        attribution: '&copy; <a href="https://carto.com/">CartoDB</a>'
      }).addTo(map);

      // Store the map instance
      this.maps[mapId] = map;

      // Add click event listener to each map for full-screen toggle
      map.getContainer().addEventListener('click', () => {
        this.toggleFullScreen(map.getContainer(), map);
      });
    });
  }

  // Function to toggle full-screen mode
  toggleFullScreen(mapElement: HTMLElement, map: L.Map) {
    mapElement.classList.add('full-screen');
    // if (mapElement.classList.contains('full-screen')) {
    //   mapElement.classList.remove('full-screen');
    // } else {
    //   mapElement.classList.add('full-screen');
    // }  
    setTimeout(() => {
      map.invalidateSize();
    }, 100); 

    this.sharedService.updateSidebarContent({status:1});
  }

  goBack() {
    this.location.back(); // This navigates to the previous page
  }
}

