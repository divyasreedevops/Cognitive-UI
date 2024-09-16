import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
@Component({
  selector: 'app-pans-ops',
  standalone: true,
  imports: [],
  templateUrl: './pans-ops.component.html',
  styleUrl: './pans-ops.component.scss'
})
export class PansOpsComponent {
  private map!: L.Map;
  private mapId: string = '';
 
  constructor(private route: ActivatedRoute) {}
 
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.mapId = params['id'];
      this.initMap();
    });
  }
 
  initMap() {
    this.map = L.map('fullScreenMap').setView([20.5937, 78.9629], 5);
 
    let tileLayerUrl: string = '';
    switch (this.mapId) {
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
 
    L.tileLayer(tileLayerUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a>'
    }).addTo(this.map);
  }
}