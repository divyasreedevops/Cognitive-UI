import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multimap',
  templateUrl: './multimap.component.html',
  styleUrls: ['./multimap.component.scss']
})
export class MultimapComponent implements AfterViewInit {
  private maps: { [key: string]: L.Map } = {}; // Stores multiple map instances, keyed by map ID
  selectedMapId: string ='map1'; // Keeps track of the currently selected map ID (default is 'map1')
  isFullScreen:boolean=false; // Tracks whether the map is in fullscreen mode or not
  constructor(private location: Location,
    private sharedService: SharedService,
    private router: Router
  ) {}

  // Lifecycle hook that runs after the view initializes
  ngAfterViewInit(): void {
    this.initMaps(); // Initializes all maps after the view is ready
  }

  // Initializes the maps with specified map IDs
  initMaps() {
    const mapIds = ['map1', 'map2', 'map3', 'map4'];

    // Loop through each map ID and initialize the map
    mapIds.forEach(mapId => {

      if (this.maps[mapId]) {
        this.maps[mapId].remove(); // Removes any existing map instance
        delete this.maps[mapId];   // Deletes the map from the maps object
      }

      // Creates a new map instance with no zoom control
      const map = L.map(mapId, {
        zoomControl: false  // Disable zoom control
      }).setView([20.5937, 78.9629], 5); // Sets the map view to India with zoom level 5

      // Selects the appropriate tile layer based on the map ID
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

      // Adds the selected tile layer to the map
      L.tileLayer(tileLayerUrl, {
        maxZoom: 19, // Maximum zoom level
        attribution: '&copy; <a href="https://carto.com/">CartoDB</a>'
      }).addTo(map);

      // Adds the map to the `maps` object for reference later
      this.maps[mapId] = map;

      // Adds an event listener to handle clicks on the map, selecting the map when clicked
      map.getContainer().addEventListener('click', () => {
        // this.toggleFullScreen(map.getContainer(), map);
        this.selectMap(mapId);
      });
    });
  }

  // Toggles the fullscreen mode for a specific map
  toggleFullScreen(mapElement: HTMLElement, map: L.Map) {
    mapElement.classList.add('full-screen');
    setTimeout(() => {
      map.invalidateSize();
    }, 100); 

    // this.sharedService.updateSidebarContent({status:1});
  }

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(){
    // Subscribes to router events to detect if the map is in fullscreen mode
    this.router.events.subscribe(() => {
      this.isFullScreen = this.router.url.includes('PANS-OPS');
      if(this.router.url === '/ADM'){
        setTimeout(() => {
          this.initMaps();
        }, 500);
       
      }
    });

    // Stores the selected map ID in localStorage for persistence
    localStorage.setItem('selectedMap',this.selectedMapId);

    // Subscribes to changes in the sidebar content from the SharedService
    this.sharedService.sidebarContent$.subscribe(() => {
      this.navigateToFullScreen(this.selectedMapId);
    });
  }

  // Navigates to the fullscreen view of the selected map
  navigateToFullScreen(mapId: string) {
    this.router.navigate(['ADM','PANS-OPS']);
  }
 
  // Handles map selection by updating the selectedMapId and resizing the map
  selectMap(mapId: string) {
    this.selectedMapId = mapId; // Updates the selected map ID
    localStorage.setItem('selectedMap',this.selectedMapId); // Saves the selected map to localStorage
    // Optionally, you can add logic here to zoom or center the selected map
    this.maps[mapId].invalidateSize(); // Adjusts the map's size to fit its container
  }

  // Navigates back to the previous location in the browser history
  goBack() {
    this.location.back();
  }
}

