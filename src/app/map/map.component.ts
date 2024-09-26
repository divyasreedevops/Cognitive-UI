import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamServiceService } from '../service/stream-service.service';
import { Flight, Plane } from '../target';
import {  Subscription } from 'rxjs';
import * as GeoJSON from 'geojson';
import { SharedService } from '../service/shared.service';
import { PansopsService } from '../service/Adm/Pansops/pansops.service';
declare module 'leaflet' {
  interface MarkerOptions {
    rotationAngle?: number;
    transform?: number;
  }
}
interface GeoJsonProperties {
  Desgtn: string;
  True_B: number;
}

type GeometryType = 
  | { type: "Point"; coordinates: [number, number] } // Longitude, Latitude
  | { type: "MultiLineString"; coordinates: number[][][] }; // Adjust based on your needs

interface GeoJsonFeature {
  type: "Feature";
  properties: GeoJsonProperties;
  geometry: GeometryType;
}

// Define a GeoJSON feature collection
interface GeoJsonFeatureCollection {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
  crs?: { type: string; properties: { name: string } }; // Optional
}


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  hasUnsavedChanges() {
    throw new Error('Method not implemented.');
  }
  Airform !: FormGroup;
  selectedAirport: string[] = [];
  selectedRunway: string[] = [];
  selectedTypeofProcedure: string[] = [];
  selectedProcedureName: string[] = [];
  private markers: { [key: string]: L.Marker } = {};
  lineGeoJsonLayer!: L.GeoJSON;
  geoJsonLayer!: L.GeoJSON;
  map!: L.Map;
  airportLayerGroup!: any;
  wmsUrl = "http://ec2-18-117-190-227.us-east-2.compute.amazonaws.com:8080/geoserver/wms"
  private waypointLayer!: L.TileLayer.WMS;
  private nonConvLineDataLayer!: L.TileLayer.WMS;
  private convLineDataLayer!: L.TileLayer.WMS;
  private navaidsLayer!: L.TileLayer.WMS;
  private controlairspaceLayer!: L.TileLayer.WMS;
  private aerodrome_obstacleLayer!: L.TileLayer.WMS;
  private restricted_areasLayer!: L.TileLayer.WMS;
  private airportdetails!: L.TileLayer.WMS;
  private Airway2!: L.TileLayer.WMS;
  private thailandenroute!: L.TileLayer.WMS;
  private FIR!: L.TileLayer.WMS;
  private India_FIR!: L.TileLayer.WMS;
  private subscription: Subscription | null = null;
  private mapId: string = '';
  menuOpen: boolean = false;
  flightslive: Flight[] = [];
  flights: Plane[] = [];
  mode: 'static' | 'animation' = 'static';
  animationIndex: number = 0;
  animationInterval: any;



    procedures=[
    {
    procedureaName:'AKTIM 7A',
    procedure:[
      {
        waypointIdentifies:'-',
        pathDesignator: 'VA',
        angle:'92.34',
        altitude:3400,
        turnDirection:'-',
        angleReduired:true,
        distance:""
        },
    {
    waypointIdentifies:'BL402',
    pathDesignator: 'DF',
    angle:'-',
    altitude:3400,
    angleReduired:false,
    distance:"",
    turnDirection:'-'
    },
    {
    waypointIdentifies:'BL403',
    pathDesignator: 'TF',
    angle:'183.83',
    altitude:3400,
    angleReduired:false,
    distance:"7.50",
    turnDirection:'R'
    },
    
    {
      waypointIdentifies:'BL404',
      pathDesignator: 'TF',
      angle:'254.09',
      altitude:3400,
      angleReduired:false,
      distance:"7.50",
      turnDirection:'R'
      },
    {
    waypointIdentifies:'OMUKA',
    pathDesignator: 'TF',
    angle:'189.18',
    altitude:3400,
    angleReduired:false,
    distance:"28.34",
    turnDirection:'L'
    },
    {
        waypointIdentifies:'AKTIM',
        pathDesignator: 'TF',
        angle:'189.06',
        altitude:3400,
        angleReduired:false,
        distance:"28.98",
        turnDirection:'-'
        },
    ]
    }
    ]
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  menuClosed() {
    this.menuOpen = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }


   toDMS(degrees: number): string {
    const absDegrees = Math.abs(degrees);
    const d = Math.floor(absDegrees);
    const m = Math.floor((absDegrees - d) * 60);
    const s = ((absDegrees - d - m / 60) * 3600).toFixed(2); // Keeping two decimal places
  
    const direction = degrees >= 0 ? (degrees === d ? 'N' : 'E') : (degrees === -d ? 'S' : 'W');
  
    return `${d}° ${m}' ${s}" ${direction}`;
  }



  optionsAirport: { value: any; label: any; }[] = [
    { value: 'VOBL/Bengaluru (KIA)', label: 'VOBL/BLR/Bengaluru' },
    { value: 'VEPY/PAKYONG', label: 'VEPY/PYG/Pakyong' },
    { value: 'VIJP/JAIPUR', label: 'VIJP/JAI/Jaipur' },];
  optionsBengaluruKIARunway: { value: any; label: any; }[] = [];
  optionsVIJPJAIPURRunway: { value: any; label: any; }[] = [];
  optionsVEPYPAKYONGRunway: { value: any; label: any; }[] = [];
  optionsRWY_09TypeofProcedure: { value: any; label: any; }[] = [];
  optionsRWY_27TypeofProcedure: { value: any; label: any; }[] = [];
  optionsRWY_02TypeofProcedure: { value: any; label: any; }[] = [];
  optionsRWY_20TypeofProcedure: { value: any; label: any; }[] = [];
  optionsRWY_09LTypeofProcedure: { value: any; label: any; }[] = [];
  optionsRWY_27RTypeofProcedure: { value: any; label: any; }[] = [];
  optionsVEPYTypeofProcedure: { value: any; label: any; }[] = [];
  optionsProcedureName: { value: any; label: any; }[] = [];

  isSidenavOpen = true;

  toggleSidenav(snav: any) {
    snav.toggle();
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  mobileQuery!: MediaQueryList;

  fillerNav = ['Home', 'Login', 'Join Us'].concat(Array.from({ length: 0 }, (_, i) => ` ${i + 1}`));


  private _mobileQueryListener: () => void;
  isExpanded = false;
  searchQuery = '';
  airPorts:any;
  runways:any;
  toggleSearchBar() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      setTimeout(() => {
        const searchInput = document.getElementById('site-search');
        if (searchInput) {
          searchInput.focus();
        }
      }, 0);
    }
  }
  constructor(private pansopsService: PansopsService,changeDetectorRef: ChangeDetectorRef, private flightService: StreamServiceService, media: MediaMatcher, private formbuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute,private sharedService: SharedService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.Airform = this.formbuilder.group({
      selectedAirport: [[]],
      selectedRunway: [[]],
      selectedTypeofProcedure: [[]],
      selectedProcedureName: [[]],
    });

    // this.pansopsService.getAirports()\





    this.sharedService.airport$.subscribe(airportsRes => {
      this.airPorts = airportsRes;
      console.log( this.airPorts," this.airPorts this.airPorts")
    });

    this.sharedService.runway$.subscribe(runwaysRes => {
      this.runways = runwaysRes;
      console.log( this.runways," this.airPorts this.airPorts")
    });




    /**
     * api call to fetch the airport details
     */

    
    
    // this.route.params.subscribe(params => {
    //   this.mapId = params['id'];
    // });
    const selectedMap = localStorage.getItem('selectedMap');
    if(selectedMap){
      this.mapId = selectedMap;
    }
    this.initMap();
    this.watchAirportChanges();

    this.selectedAirport = [];
    this.selectedRunway = [];
    this.selectedTypeofProcedure = [];
    this.selectedProcedureName = [];
    this.updateLayers();

    this.sharedService.formValues$.subscribe(formData => {
      if (formData) {
        this.Airform.setValue(formData);
      }
    });


  

  }


  fetchFlightData(): void {
    this.flightService.getLiveFlights().subscribe(
      (data: Flight[]) => {
        this.flightslive = data;
        this.updateFlightMarkers();
      },
      error => {
        console.error('Error fetching flight data', error);
      }
    );
  }

  private updateFlightMarkers(): void {
    this.flightslive.forEach(flight => {
      const planeSVG = `
        <svg height="20" width="20" style="transition: transform 0.5s ease; transform: rotate(${flight.heading}deg); transform-origin: center; background: none; border: none;" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 46.876 46.876" xml:space="preserve" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#e3b021;" d="M26.602,24.568l15.401,6.072l-0.389-4.902c-10.271-7.182-9.066-6.481-14.984-10.615V2.681 c0-1.809-1.604-2.701-3.191-2.681c-1.587-0.021-3.19,0.872-3.19,2.681v12.44c-5.918,4.134-4.714,3.434-14.985,10.615l-0.39,4.903 l15.401-6.072c0,0-0.042,15.343-0.006,15.581l-5.511,3.771v2.957l7.044-2.427h3.271l7.046,2.427V43.92l-5.513-3.771 C26.644,39.909,26.602,24.568,26.602,24.568z"></path> </g> </g></svg>
      `;

      const icon = L.divIcon({
        html: planeSVG,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        className: 'custom-plane-icon'
      });

      if (this.markers[flight.flight_id]) {
        // Update existing marker
        this.markers[flight.flight_id].setLatLng([flight.latitude, flight.longitude]).setIcon(icon);
      } else {
        // Create new marker
        const marker = L.marker([flight.latitude, flight.longitude], { icon })
          .bindPopup(`<b>Flight Number:</b> ${flight.flight_number}<br><b>Airline:</b> ${flight.airline_name}<br><b>Status:</b> ${flight.flight_state}`)
          .addTo(this.map);
        this.markers[flight.flight_id] = marker;
      }
    });
  }



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }




  // all world data
  // private updateMapWithPlaneData(data: { satellite: Plane[]; terrestrial: Plane[] }): void {
  //   const planes = [...data.satellite, ...data.terrestrial];

  //   if (planes.length === 0) {
  //     console.error('No valid plane data found', data);
  //     return;
  //   }

  //   planes.forEach((plane: any) => {
  //     const target: Plane = {
  //       icao_address: plane.icao_address,
  //       callsign: plane.callsign,
  //       origin_country: plane.origin_country || '',
  //       time_position: plane.timestamp,
  //       last_contact: plane.ingestion_time,
  //       longitude: parseFloat(plane.longitude),
  //       latitude: parseFloat(plane.latitude),
  //       altitude_baro: parseFloat(plane.altitude_baro),
  //       on_ground: plane.on_ground,
  //       velocity: parseFloat(plane.speed),
  //       heading: parseFloat(plane.heading),
  //       vertical_rate: parseFloat(plane.vertical_rate),
  //       sensors: plane.source || '',
  //       geo_altitude: parseFloat(plane.altitude_baro),
  //       squawk: plane.squawk,
  //       spi: plane.on_ground,
  //       position_source: 1,
  //       collection_type: plane.collection_type,
  //     };

  //     if (isNaN(target.latitude) || isNaN(target.longitude)) {
  //       console.error('Invalid coordinates for plane:', target);
  //       return;
  //     }

  //     const planeSVG = `
  //     <svg height="20" width="20" style="transform-origin: center; transform: rotate(${target.heading}deg);" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 46.876 46.876" xml:space="preserve" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#e3b021;" d="M26.602,24.568l15.401,6.072l-0.389-4.902c-10.271-7.182-9.066-6.481-14.984-10.615V2.681 c0-1.809-1.604-2.701-3.191-2.681c-1.587-0.021-3.19,0.872-3.19,2.681v12.44c-5.918,4.134-4.714,3.434-14.985,10.615l-0.39,4.903 l15.401-6.072c0,0-0.042,15.343-0.006,15.581l-5.511,3.771v2.957l7.044-2.427h3.271l7.046,2.427V43.92l-5.513-3.771 C26.644,39.909,26.602,24.568,26.602,24.568z"></path> </g> </g></svg>
  //   `;

  //     const planeIcon = L.divIcon({
  //       html: planeSVG,
  //       className: 'custom-plane-icon',
  //       iconSize: [20, 20],
  //       iconAnchor: [10, 10],
  //     });

  //     if (this.markers[target.icao_address]) {
  //       const marker = this.markers[target.icao_address];
  //       marker.setLatLng([target.latitude, target.longitude]);
  //       marker.setIcon(planeIcon);
  //     } else {
  //       const marker = L.marker([target.latitude, target.longitude], { icon: planeIcon });
  //       marker.addTo(this.map).on('click', () => {
  //         this.displayPlaneData(target);
  //       });

  //       this.markers[target.icao_address] = marker;
  //     }
  //   });
  // }

  spiresAPI(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
      this.clearMarkers();
      clearInterval(this.animationInterval);
    } else {
      this.subscription = this.flightService.listenToStream().subscribe({
        next: (data: { satellite: Plane[]; terrestrial: Plane[] }) => {
          this.updateMapWithPlaneData(data);
        },
        error: err => console.error('Error listening to stream', err)
      });
    }
  }

  private updateMapWithPlaneData(data: { satellite: Plane[]; terrestrial: Plane[] }): void {
    const planes = [...data.satellite, ...data.terrestrial];

    if (planes.length === 0) {
      console.error('No valid plane data found', data);
      return;
    }

    if (this.mode === 'animation') {
      this.startAnimation(planes);
    } else {
      this.updateMarkers(planes);
    }
  }

  private updateMarkers(planes: Plane[]): void {
    planes.forEach((plane: Plane) => {
      if (!plane.callsign || !plane.callsign.startsWith('IGO')) {
        return;
      }

      const planeSVG = `
        <svg height="20" width="20" style="transform-origin: center; transform: rotate(${plane.heading}deg);" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 46.876 46.876" xml:space="preserve" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#e3b021;" d="M26.602,24.568l15.401,6.072l-0.389-4.902c-10.271-7.182-9.066-6.481-14.984-10.615V2.681 c0-1.809-1.604-2.701-3.191-2.681c-1.587-0.021-3.19,0.872-3.19,2.681v12.44c-5.918,4.134-4.714,3.434-14.985,10.615l-0.39,4.903 l15.401-6.072c0,0-0.042,15.343-0.006,15.581l-5.511,3.771v2.957l7.044-2.427h3.271l7.046,2.427V43.92l-5.513-3.771 C26.644,39.909,26.602,24.568,26.602,24.568z"></path> </g> </g></svg>
      `;

      const planeIcon = L.divIcon({
        html: planeSVG,
        className: 'custom-plane-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      if (this.markers[plane.icao_address]) {
        const marker = this.markers[plane.icao_address];
        marker.setLatLng([plane.latitude, plane.longitude]);
        marker.setIcon(planeIcon);
      } else {
        const marker = L.marker([plane.latitude, plane.longitude], { icon: planeIcon });
        marker.addTo(this.map).on('click', () => {
          this.displayPlaneData(plane);
        });

        this.markers[plane.icao_address] = marker;
      }
    });
  }

  private startAnimation(planes: Plane[]): void {
    clearInterval(this.animationInterval);

    this.animationInterval = setInterval(() => {
      const plane = planes[this.animationIndex];
      this.animationIndex = (this.animationIndex + 1) % planes.length;

      if (!plane.callsign || !plane.callsign.startsWith('IGO')) {
        return;
      }

      const planeSVG = `
        <svg height="20" width="20" style="transform-origin: center; transform: rotate(${plane.heading}deg);" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 46.876 46.876" xml:space="preserve" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#e3b021;" d="M26.602,24.568l15.401,6.072l-0.389-4.902c-10.271-7.182-9.066-6.481-14.984-10.615V2.681 c0-1.809-1.604-2.701-3.191-2.681c-1.587-0.021-3.19,0.872-3.19,2.681v12.44c-5.918,4.134-4.714,3.434-14.985,10.615l-0.39,4.903 l15.401-6.072c0,0-0.042,15.343-0.006,15.581l-5.511,3.771v2.957l7.044-2.427h3.271l7.046,2.427V43.92l-5.513-3.771 C26.644,39.909,26.602,24.568,26.602,24.568z"></path> </g> </g></svg>
      `;

      const planeIcon = L.divIcon({
        html: planeSVG,
        className: 'custom-plane-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      if (this.markers[plane.icao_address]) {
        const marker = this.markers[plane.icao_address];
        marker.setLatLng([plane.latitude, plane.longitude]);
        marker.setIcon(planeIcon);
      } else {
        const marker = L.marker([plane.latitude, plane.longitude], { icon: planeIcon });
        marker.addTo(this.map).on('click', () => {
          this.displayPlaneData(plane);
        });

        this.markers[plane.icao_address] = marker;
      }
    }, 1000); // Adjust interval as needed
  }

  private displayPlaneData(plane: Plane): void {
    L.popup()
      .setLatLng([plane.latitude, plane.longitude])
      .setContent(`
      <div>
        <p><strong>ICAO Address:</strong> ${plane.icao_address}</p>
        <p><strong>Callsign:</strong> ${plane.callsign}</p>
        <p><strong>Origin Country:</strong> ${plane.origin_country}</p>
        <p><strong>Longitude:</strong> ${plane.longitude}</p>
        <p><strong>Latitude:</strong> ${plane.latitude}</p>
        <p><strong>Altitude:</strong> ${plane.altitude_baro}</p>
        <p><strong>Velocity:</strong> ${plane.velocity}</p>
        <p><strong>Heading:</strong> ${plane.heading}</p>
        <p><strong>Vertical Rate:</strong> ${plane.vertical_rate}</p>
        <p><strong>Geo Altitude:</strong> ${plane.geo_altitude}</p>
        <p><strong>Squawk:</strong> ${plane.squawk}</p>
      </div>
    `)
      .openOn(this.map);
  }

  private clearMarkers(): void {
    Object.keys(this.markers).forEach(key => {
      this.map.removeLayer(this.markers[key]);
    });
    this.markers = {};
  }

  initMap(): void {
    this.map = L.map('map', { zoomControl: false, attributionControl: false }).setView([20.5937, 78.9629], 5);

    const streets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });

    const darkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {});

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {});

    const navigation = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    });

    const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const baseMaps = {
      'Streets': streets,
      'Satellite': satellite,
      'Navigation': navigation,
      'Hybrid': googleHybrid,
      'Satellite Google': googleSat,
      'Terrain': googleTerrain,
      'Dark': darkMatter
    };

    const overlayMaps = {};

    L.control.layers(baseMaps, overlayMaps, { position: 'topleft' }).addTo(this.map);
    // navigation.addTo(this.map);
    switch (this.mapId) {
      case 'map1':
        satellite.addTo(this.map);
        break;
      case 'map2':
        streets.addTo(this.map);
        break;
      case 'map3':
        darkMatter.addTo(this.map)
        break;
      case 'map4':
        navigation.addTo(this.map)
        break;
    }
    L.control.scale({ position: 'bottomright', metric: false }).addTo(this.map);
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    this.airportLayerGroup = L.layerGroup().addTo(this.map);
  }


 calculateCoordinated=(referenceLat=28.18888889,referenceLon:any=74.11138889,angleDeg:any= 92.05)=>{
// Given data
const speedKnots = 180; // speed in knots

// Convert angle to radians
const angleRad = angleDeg * (Math.PI / 180);

// Convert speed (nautical miles) to distance in kilometers
const distanceNm = speedKnots; // distance in nautical miles (assuming 1 hour)
const distanceKm = distanceNm * 1.852; // convert nautical miles to kilometers

// Calculate latitude and longitude deltas
const deltaLat = distanceKm * Math.cos(angleRad) / 111; // 1 degree latitude ≈ 111 km
const deltaLon = distanceKm * Math.sin(angleRad) / (111 * Math.cos(referenceLat * (Math.PI / 180))); // 1 degree longitude ≈ 111 km * cos(latitude)

// New coordinates
const newLat = referenceLat + deltaLat;
const newLon = referenceLon + deltaLon;
  var returnData:number[]=[newLat,newLon,0.0];
 return returnData
  }


  getWaypoints=(wayPoint:any)=>{
     const waypoints=[
      {
          waypoint:'BL402',
          coordinates:[ 77.91941944444444,13.205077777777777 ]
      },
      {
          waypoint:'BL403',
          coordinates:[  77.9148888888889, 13.078027777777777 ]
      }, {
          waypoint:'BL404',
          coordinates:[ 77.70667777777778 ,13.012808333333334]
      }, {
          waypoint:'OMUKA',
          coordinates:[  77.64480833333334,12.542319444444445] 
      }, {
          waypoint:'AKTIM',
          coordinates:[  77.58271111111111,12.061094444444445 ]
      },
  ];
 const selectyedWayPoint= waypoints.find((ele)=>ele.waypoint===wayPoint);
 return selectyedWayPoint?.coordinates||[]

  }

  getDistance=(altitude:any)=>{
    const distance =((altitude/200)*1852);
    return distance;
  }
  vinc=(latitude1:any, longitude1:any, alpha1To2:any, s:any, reverse_output = false)=> {
    if (s === 0) {
        return [latitude1, longitude1];
    }

    const f = 1.0 / 298.257223563; // WGS84
    const a = 6378137.0; // metres
    const piD4 = Math.atan(1.0);
    const two_pi = piD4 * 8.0;
    alpha1To2=parseInt(alpha1To2)-90;
    latitude1 = latitude1 * piD4 / 45.0;
    longitude1 = longitude1 * piD4 / 45.0;
    alpha1To2 = alpha1To2 * piD4 / 45.0;

    if (alpha1To2 < 0.0) {
        alpha1To2 += two_pi;
    }
    if (alpha1To2 > two_pi) {
        alpha1To2 -= two_pi;
    }

    const b = a * (1.0 - f);
    const TanU1 = (1 - f) * Math.tan(latitude1);
    const U1 = Math.atan(TanU1);
    const sigma1 = Math.atan2(TanU1, Math.cos(alpha1To2));
    const Sinalpha = Math.cos(U1) * Math.sin(alpha1To2);
    const cosalpha_sq = 1.0 - Sinalpha * Sinalpha;
    const u2 = cosalpha_sq * (a * a - b * b) / (b * b);
    const A = 1.0 + (u2 / 16384) * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
    const B = (u2 / 1024) * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));

    let sigma = s / (b * A);
    let last_sigma = 2.0 * sigma + 2.0;
    let two_sigma_m = 0;

    while (Math.abs((last_sigma - sigma) / sigma) > 1.0e-9) {
        two_sigma_m = 2 * sigma1 + sigma;
        const delta_sigma = B * Math.sin(sigma) * (
            Math.cos(two_sigma_m) + (B / 4) * (
                Math.cos(sigma) * (
                    -1 + 2 * Math.pow(Math.cos(two_sigma_m), 2) - (B / 6) * Math.cos(two_sigma_m) * (-3 + 4 * Math.pow(Math.sin(sigma), 2)) * (-3 + 4 * Math.pow(Math.cos(two_sigma_m), 2))
                )
            )
        );
        last_sigma = sigma;
        sigma = (s / (b * A)) + delta_sigma;
    }

    const latitude2 = Math.atan2(
        (Math.sin(U1) * Math.cos(sigma) + Math.cos(U1) * Math.sin(sigma) * Math.cos(alpha1To2)),
        ((1 - f) * Math.sqrt(Math.pow(Sinalpha, 2) + Math.pow(Math.sin(U1) * Math.sin(sigma) - Math.cos(U1) * Math.cos(sigma) * Math.cos(alpha1To2), 2)))
    );

    const lambda = Math.atan2(
        (Math.sin(sigma) * Math.sin(alpha1To2)),
        (Math.cos(U1) * Math.cos(sigma) - Math.sin(U1) * Math.sin(sigma) * Math.cos(alpha1To2))
    );

    const C = (f / 16) * cosalpha_sq * (4 + f * (4 - 3 * cosalpha_sq));
    const omega = lambda - (1 - C) * f * Sinalpha * (
        sigma + C * Math.sin(sigma) * (
            Math.cos(two_sigma_m) + C * Math.cos(sigma) * (-1 + 2 * Math.pow(Math.cos(two_sigma_m), 2))
        )
    );

    let longitude2 = longitude1 + omega;
    let alpha21 = Math.atan2(Sinalpha, -Math.sin(U1) * Math.sin(sigma) + Math.cos(U1) * Math.cos(sigma) * Math.cos(alpha1To2));

    alpha21 += two_pi / 2.0;
    if (alpha21 < 0.0) {
        alpha21 += two_pi;
    }
    if (alpha21 > two_pi) {
        alpha21 -= two_pi;
    }

    const latitude2_deg = latitude2 * 45.0 / piD4;
    const longitude2_deg = longitude2 * 45.0 / piD4;
    const alpha21_deg = alpha21 * 45.0 / piD4;
    if (reverse_output) {
        return [longitude2_deg, latitude2_deg];
    } else {
        return [latitude2_deg, longitude2_deg];
    }
}

  createGeoJsonPointObject=(procedures:any,procedureName:any="sid")=>{

    var  featureCollection: GeoJSON.FeatureCollection<GeoJSON.Point>= {
      "type": "FeatureCollection",
      "features": [
      ]
      }

      var lineJson:GeoJSON.FeatureCollection<GeoJSON.MultiLineString>  ={
        "type": "FeatureCollection",
        "features": [
         ]
        }
      
        if(procedureName.toLowerCase()==="1"){

          /**
           * @todo need to consider end point
           */
          const thresholdValues=   this.runways.find((ele:any)=>ele.designation===this.Airform.get('selectedRunway')?.value).geometry_runway_start.coordinates;
          featureCollection.features.push( { "type": "Feature", "properties": { "Name": "IF",  "Speed": "", "Altitude": "" }, "geometry": { "type": "Point", "coordinates":thresholdValues } });
        }



    procedures.map((procedure:any)=>{
      procedure.procedure.map((ele:any,index:number)=>{
        var coordinates:number[];
          if(ele.pathDesignator==='VA' || ele.pathDesignator==='CA' || ele.pathDesignator==='FA')
          {
            const prevCoordinates=featureCollection.features[featureCollection.features.length-1].geometry.coordinates;
            const distance=this.getDistance( parseInt(ele.altitude))
            coordinates  =  this.vinc( prevCoordinates[0],prevCoordinates[1],ele.angle,distance,false)
            featureCollection.features.push(
               { "type": "Feature", "properties": { "Name":  ele.waypointIdentifies,  "Speed": "", "Altitude": ele.altitude }, "geometry": { "type": "Point", "coordinates":coordinates } }
            );
            // Safely get the last feature's name
       const lastFeature = featureCollection.features[featureCollection.features.length - 1];
      const startPoint = lastFeature && lastFeature.properties ? lastFeature.properties['Name']|| "" : "";
             lineJson.features.push({ "type": "Feature", "properties": { "Name":  ele.pathDesignator, "Distance":null, "Bearing": ele.angle, "StartPoint":startPoint,"EndPoint":  ele.waypointIdentifies}, "geometry": { "type": "MultiLineString", "coordinates": [ [ prevCoordinates, coordinates ] ] } },)
          }else{
            
           if(featureCollection.features.length>0){
            const prevCoordinates=featureCollection.features[featureCollection.features.length-1].geometry.coordinates;
                        // Safely get the last feature's name
          const lastFeature = featureCollection.features[featureCollection.features.length - 1];
          const startPoint = lastFeature && lastFeature.properties ? lastFeature.properties['Name']|| "" : "";
            lineJson.features.push({ "type": "Feature", "properties": { "Name":  ele.pathDesignator,"StartPoint":startPoint,"EndPoint":  ele.waypointIdentifies, "Distance":ele.distance?ele.distance:null, "Bearing": ele.angle }, "geometry": { "type": "MultiLineString", "coordinates": [ [ prevCoordinates, this.getWaypoints(ele.waypointIdentifies) ] ] } },)
           }
            featureCollection.features.push(
              { "type": "Feature", "properties": { "Name": ele.waypointIdentifies, "Speed": "", "Altitude": ele.altitude }, "geometry": { "type": "Point", "coordinates":this.getWaypoints(ele.waypointIdentifies) } }
           );
          }
      })
    })
    return {pointJson:featureCollection,lineJson:lineJson};
  }



  


  updateLayers(): void {
  // Clear existing layers
  this.airportLayerGroup.clearLayers();
    const loadSIDProcedure = async (procedureName: string[])=>{
      if(this.Airform.get('selectedRunway')?.value.length!==0){
           const selectedRunwyInfo=  this.runways.find((runway:any)=>runway.designation=== this.Airform.get('selectedRunway')?.value);
           const angle=selectedRunwyInfo.true_bearing.replace(' DEG','°');
           const runwayIcon = L.icon({
             iconUrl: 'assets/AKTIM_7A/RWY.png',
             iconSize: [20, 30],
             iconAnchor: [10, 30]
           });
           const feature: GeoJsonFeature = {
             type: "Feature",
             properties: {
               Desgtn: selectedRunwyInfo.designation,
               True_B: angle,
             },
             geometry: {
               type: "Point",
               coordinates: selectedRunwyInfo.geometry_runway_start.coordinates, // Ensure this matches [number, number]
             },
           };

           const geoJsonFeatureCollection:GeoJsonFeatureCollection={
            features:[feature],
            type:"FeatureCollection",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

           }

             const geoLayer = L.geoJSON(geoJsonFeatureCollection, {
               pointToLayer: (feature, latlng) => {
                 const trueB = parseFloat(feature.properties.True_B);
                 let marker: L.Marker<any>|null;
       
                 if (!isNaN(trueB)) {
                   const rotationAngle = trueB
                   console.log(rotationAngle)
                   /**
                    * @todo add +180 degree to rotate
                    */
                   marker = L.marker(latlng, { icon: runwayIcon, rotationAngle: rotationAngle });
                 } else {
                   console.error('Invalid True_B value:', feature.properties.True_B);
                   // Create a transparent marker as a fallback
                   marker = L.marker(latlng, { opacity: 0 });
                 }
                 return marker;
               }
             });
             const pointLineJsons =   this.createGeoJsonPointObject(this.procedures,procedureName[0]);
             this.airportLayerGroup.addLayer(geoLayer);
             const stepIcon = L.icon({
               iconUrl: 'assets/AKTIM_7A/Fly-by.png',
               iconSize: [40, 40],
               popupAnchor: [-3, -76],
             });
             let currentTooltip:any = null; // Initialize a variable to store the current tooltip
       
             const geoJsonLayer = L.geoJSON(pointLineJsons.pointJson, {
               pointToLayer: (feature, latlng) => {
                 const marker = L.marker(latlng, { icon: stepIcon });
             
                 // Set up the permanent tooltip content
                 let tooltipContent = '';
                 if (feature.properties.Name) {
                   tooltipContent += `<b>${feature.properties.Name}</b><br>`;
                 }
                 if (feature.properties.Altitude) {
                   tooltipContent += `${feature.properties.Altitude}<br>`;
                 }
                 if (feature.properties.Speed) {
                   tooltipContent += `${feature.properties.Speed}<br>`;
                 }
                 if (feature.properties.Speed1) {
                   tooltipContent += `${feature.properties.Speed1}`;
                 }
             
                 // Bind the permanent tooltip to the marker
                 if (tooltipContent !== '') {
                   marker.bindTooltip(tooltipContent, {
                     permanent: true,
                     direction: 'bottom',
                     className: 'labelstyle',
                     offset: L.point(25, 0),
                   });
                 }
             
                 return marker;
               },
             
               onEachFeature: (feature, layer) => {
                 if (layer instanceof L.Marker) {
                   layer.on('click', () => {
                     // Get the coordinates and waypoint name
                     const coordinates = layer.getLatLng();
                     const waypointName = feature.properties.Name || "Unknown Waypoint";
                     const latitude=this.toDMS(coordinates.lat);
                     const longitude=this.toDMS(coordinates.lng);
       
                     // Create tooltip content for the click
                     const tooltipContent = `
                       <div>
                         <strong>Waypoint:</strong> ${waypointName}<br />
                         <strong>Coordinates:</strong>  ${latitude} , ${longitude}<br />
                       </div>
                     `;
             
                     // Create a popup to display the information
                     L.popup()
                       .setLatLng(coordinates)
                       .setContent(tooltipContent)
                       .openOn(this.map); // Use the marker's map reference
                   });
                 }
               }
             });
             // Add the layer to your map
             geoJsonLayer.addTo(this.map);
               
             // Ensure to close tooltips when clicking on the map
             this.map.on('click', () => {
               if (currentTooltip) {
                 currentTooltip.closeTooltip();
                 currentTooltip = null; // Reset the current tooltip reference
               }
             });
             
       
             this.airportLayerGroup.addLayer(geoJsonLayer);
             this.map.fitBounds(geoJsonLayer.getBounds());
       
             // Load Line_SID GeoJSON datat  
             // const lineResponse = await fetch(lineFileName);
             const lineData :GeoJSON.FeatureCollection<GeoJSON.MultiLineString>= pointLineJsons.lineJson;
       
       
               const lineFeatures = lineData.features; // Assuming lineData is your GeoJSON data
       
               this.lineGeoJsonLayer = L.geoJSON(lineData, {
                   style: {
                       color: 'black', // Set line color
                       weight: 2 // Set line weight
                   },
                   onEachFeature: (feature: GeoJSON.Feature<GeoJSON.MultiLineString>, layer) => {
                       const currentIndex = lineFeatures.indexOf(feature as GeoJSON.Feature<GeoJSON.MultiLineString>); // Type assertion here
                       layer.on('click', () => {
                         if (feature.properties) {
                             const name = feature.properties['Name'];
       
                             const startPoint=feature.properties['StartPoint']
                             const endPoint=feature.properties['EndPoint']
                           
                             // Create a tooltip content
                             const tooltipContent = `
                                 <div>
                                     <strong>Path Terminatore:</strong> ${name}<br />
                                     <strong>StartPoint:</strong> ${startPoint}<br/>
                                     <strong>EndPoint:</strong> ${endPoint}<br/>
                                 </div>
                             `;
                     
                             // Cast the layer to Polyline to access getLatLngs
                             const polyline = layer as L.Polyline;
                             const latLngs = polyline.getLatLngs();
                             console.log(JSON.stringify(latLngs),"latLngslatLngs")
                     
                           // Function to flatten LatLng coordinates
                           const flattenLatLngs = (latLngs: L.LatLng | L.LatLng[] | L.LatLng[][] | L.LatLng[][][]): L.LatLng[] => {
                             if (Array.isArray(latLngs)) {
                                 return latLngs.flatMap(flattenLatLngs); // Recursively flatten
                             }
                             return [latLngs]; // Wrap a single LatLng in an array
                         };
                             // Flattening the LatLngs
                        // Flatten the LatLngs to ensure we have a single array
                          const flatLatLngs: L.LatLng[] = flattenLatLngs(latLngs);
                     
                             // Calculate bounds from the line's coordinates
                             const bounds = L.latLngBounds(flatLatLngs);
                     
                             // Show the tooltip at the center of the bounds
                             L.popup()
                                 .setLatLng(bounds.getCenter())
                                 .setContent(tooltipContent)
                                 .openOn(this.map);
                         }
                     });
                     
                     
                     
           
                       if (feature.properties) {
                           const bearing = feature.properties['Bearing'];
                           const distance = feature.properties['Distance'];
               
                           if (bearing !== null || distance !== null) {
                               let coordinates: number[][] = [];
                               if (feature.geometry.type === 'MultiLineString') {
                                   coordinates = feature.geometry.coordinates[0]; // For MultiLineString, choose the first line
                               } else if (feature.geometry.type === 'LineString') {
                                   coordinates = feature.geometry.coordinates[0];
                               }
               
                               const start = coordinates[0];
                               const end = coordinates[1];
               
                               // Calculate the angle between start and end points in radians
                               let angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
               
                               // Ensure angle is positive
                               if (angle < 0) {
                                   angle += 2 * Math.PI;
                               }
               
                               // Calculate the center point of the line segment
                               const center = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
               
                               let rotationAngle;
               
                               if (distance !== null) {
                                   const customIcon = L.icon({
                                       iconUrl: 'assets/AKTIM_7A/penta.png',
                                       iconSize: [44, 36],
                                       iconAnchor: [20, 19]
                                   });
               
                                   let iconRotationAngle = parseFloat(bearing);
               
                                   if (isNaN(iconRotationAngle)) {
                                       const nextIndex = currentIndex + 1;
                                       if (nextIndex < lineFeatures.length) {
                                           const nextFeature = lineFeatures[nextIndex];
                                           if (nextFeature.properties && nextFeature.properties['Bearing']) {
                                               iconRotationAngle = parseFloat(nextFeature.properties['Bearing']);
                                           }
                                       }
                                   }
               
                                   const marker = L.marker(L.latLng(center[1], center[0]), {
                                       icon: customIcon,
                                       rotationAngle: iconRotationAngle
                                   }).addTo(this.airportLayerGroup);
               
                                   if (iconRotationAngle !== null) {
                                       rotationAngle = iconRotationAngle >= 0 && iconRotationAngle < 180 
                                                       ? iconRotationAngle - 90 
                                                       : iconRotationAngle + 90;
                                   } else {
                                       rotationAngle = angle * (180 / Math.PI) - 90;
                                   }
               
                                   const distanceTooltip = `<div style="transform: rotate(${rotationAngle}deg); font-size: 8px;">${feature.properties['Distance']}</div>`;
                                   marker.bindTooltip(distanceTooltip, {
                                       permanent: true,
                                       direction: 'center',
                                       className: 'labelstyle',
                                       opacity: 1
                                   });
                               }
               
                               if (bearing !== null) {
                                   const bearingMarker = L.marker(L.latLng(center[1], center[0]), {
                                       rotationAngle: rotationAngle,
                                       icon: L.divIcon({
                                           className: 'bearing-label',
                                           html: `<div style="font-size: 8px;">${feature.properties['Bearing']}</div>`,
                                           iconAnchor: [10, 20]
                                       })
                                   }).addTo(this.airportLayerGroup);
                               }
                           }
                       }
                   }
               });
               
               this.airportLayerGroup.addLayer(this.lineGeoJsonLayer);
         }
    }


    if(this.selectedProcedureName.length!==0){
       loadSIDProcedure(this.selectedProcedureName);
    }

}


  watchAirportChanges(): void {
    this.Airform.get('selectedAirport')?.valueChanges.subscribe((selectedAirport: string[]) => {
      console.log('trigger');
      // Clear all runway and procedure options when the selected airport changes
      this.optionsBengaluruKIARunway = [];
      this.optionsVIJPJAIPURRunway = [];
      this.optionsVEPYPAKYONGRunway = [];
      this.optionsRWY_09LTypeofProcedure = [];
      this.selectedTypeofProcedure = [];

     

      const customIcon = L.icon({
        iconUrl: 'assets/airport.png',
        iconSize: [30, 30],
        iconAnchor: [10, 30]
      });



      // // Check if VOBL/Bengaluru (KIA) is selected
      // if (selectedAirport.includes('VOBL/Bengaluru (KIA)')) {

      //   this.airportLayerGroup.clearLayers(); // Remove all markers when no airport is selected

      //   const marker = L.marker([13.198889, 77.705556], { icon: customIcon }).addTo(this.airportLayerGroup);


      //   // Set the map view to the marker's position
      //   this.map.setView([13.1979, 77.7063], 13);


      //   this.optionsBengaluruKIARunway = [
      //     { value: 'RWY 09L', label: 'RWY 09L' },
      //     { value: 'RWY_9R', label: 'RWY 09R' },
      //     { value: '27L_RWY', label: 'RWY 27L' },
      //     { value: 'RWY 27R', label: 'RWY 27R' },
      //   ];
      //   // Set view to Bengaluru
      //   this.map.setView([13.206944, 77.704167], 12);
      // } else {
      //   this.optionsBengaluruKIARunway = [];
      // }

      // // Check if VIJP/JAIPUR is selected
      // if (selectedAirport.includes('VIJP/JAIPUR')) {
      //   const marker = L.marker([26.824167, 75.8025], { icon: customIcon }).addTo(this.airportLayerGroup);


      //   // Set the map view to the marker's position
      //   this.map.setView([23.071111, 72.626389], 13);


      //   // Show options for VIJP/JAIPUR
      //   this.optionsVIJPJAIPURRunway = [
      //     { value: 'RWY_09', label: 'RWY_08' },
      //     { value: 'RWY_27', label: 'RWY_26' },
      //   ];
      //   // Set view to Jaipur
      //   this.map.setView([26.824167, 75.812222], 12);
      // } else {
      //   this.optionsVIJPJAIPURRunway = [];
      // }
      // // Check if VEPY/PAKYONG is selected
      // if (selectedAirport.includes('VEPY/PAKYONG')) {
      //   const marker = L.marker([27.225833, 88.585833], { icon: customIcon }).addTo(this.airportLayerGroup);

      //   // Set the map view to the marker's position
      //   this.map.setView([27.1333, 88.3509], 13);
      //   // Show options for VEPY/PAKYONG
      //   this.optionsVEPYPAKYONGRunway = [
      //     { value: 'RWY 02', label: 'RWY 02' },
      //     { value: 'RWY 20', label: 'RWY 20' },
      //   ];
      //   // Set view to Pakyong
      //   this.map.setView([27.2394, 88.5961], 12);
      // } else {
      //   this.optionsVEPYPAKYONGRunway = [];
      // }
    });

    this.Airform.get('selectedRunway')?.valueChanges.subscribe((selectedRunway: string[]) => {
      // Reset options for both runways
      this.selectedTypeofProcedure = [];
      this.optionsRWY_09LTypeofProcedure = [];

      const customIcon = L.icon({
        iconUrl: 'assets/airport.png',
        iconSize: [30, 30],
        iconAnchor: [10, 30]
      });

      // Check if RWY 09L or RWY 27R is selected
        if(selectedRunway?.length){
       const thresholdValues=   this.runways.find((ele:any)=>ele.designation===selectedRunway).geometry_runway_start;
       this.airportLayerGroup.clearLayers(); // Remove all markers when no airport is selected
        const marker = L.marker([thresholdValues.coordinates[1], thresholdValues.coordinates[0]], { icon: customIcon }).addTo(this.airportLayerGroup);
        // Set the map view to the marker's position
        this.map.setView([thresholdValues.coordinates[1], thresholdValues.coordinates[0]], 13);
        }
    });

    this.Airform.get('selectedTypeofProcedure')?.valueChanges.subscribe((selectedTypeofProcedure: string[]) => {

      let filteredOptions: { value: string, label: string }[] = [];

      if (this.Airform.get('selectedRunway')?.value.includes('RWY 09L')) {
        if (selectedTypeofProcedure.includes('SID')) {

          filteredOptions = filteredOptions.concat([
            { value: 'AKTIM 7A', label: 'AKTIM 7A' },
            { value: 'ANIRO 7A', label: 'ANIRO 7A' },
            { value: 'GUNIM 7A', label: 'GUNIM 7A' },
            { value: 'VAGPU 7A', label: 'VAGPU 7A' },
            { value: 'GUNIM 7L', label: 'GUNIM 7L' },
            { value: 'OPAMO 7A', label: 'OPAMO 7A' },
            { value: 'PEXEG 7A', label: 'PEXEG 7A' },
            { value: 'TULNA 7A', label: 'TULNA 7A' },
            { value: 'VEMBO 7A', label: 'VEMBO 7A' },
            { value: 'LATID 7A', label: 'LATID 7A' },
            { value: 'SAI 7A', label: 'SAI 7A' },
          ]);
        }
        if (selectedTypeofProcedure.includes('STAR')) {
          filteredOptions = filteredOptions.concat([
            { value: 'ADKAL 7E', label: 'ADKAL 7E' },
            { value: 'GUNIM 7E', label: 'GUNIM 7E' },
            { value: 'LEKAP 7E', label: 'LEKAP 7E' },
            { value: 'PEXEG 7E', label: 'PEXEG 7E' },
            { value: 'RIKBU 7E', label: 'RIKBU 7E' },
            { value: 'SUSIK 7E', label: 'SUSIK 7E' },
            { value: 'SUSIK 7J', label: 'SUSIK 7J' },
            { value: 'TELUV 7E', label: 'TELUV 7E' },
            { value: 'UGABA 7E', label: 'UGABA 7E' },
            { value: 'XIVIL 7E', label: 'XIVIL 7E' },
          ]);
        }
        if (selectedTypeofProcedure.includes('APCH')) {
          filteredOptions = filteredOptions.concat([
            { value: 'RNP', label: 'RNP_RWY_09L' },
          ]);
        }
        this.optionsProcedureName = filteredOptions;
      }
      if (this.Airform.get('selectedRunway')?.value.includes('RWY 27R')) {
        if (selectedTypeofProcedure.includes('SID')) {

          filteredOptions = filteredOptions.concat([
            { value: 'AKTIM 7B', label: 'AKTIM 7B' },
            { value: 'ANIRO 7B', label: 'ANIRO 7B' },
            { value: 'GUNIM 7B', label: 'GUNIM 7B' },
            { value: 'GUNIM 7J', label: 'GUNIM 7J' },
            { value: 'OPAMO 7B', label: 'OPAMO 7B' },
            { value: 'SAI 7B', label: 'SAI 7B' },
            { value: 'PEXEG 7B', label: 'PEXEG 7B' },
            { value: 'TULNA 7B', label: 'TULNA 7B' },
            { value: 'VEMBO 7B', label: 'VEMBO 7B' },
            { value: 'LATID 7B', label: 'LATID 7B' },
            { value: 'VEMBO 7S', label: 'VEMBO 7S' },
            { value: 'ANIRO 7S', label: 'ANIRO 7S' },
            { value: 'VAGPU 7B', label: 'VAGPU 7B' },
          ]);
        }
        if (selectedTypeofProcedure.includes('STAR')) {
          filteredOptions = filteredOptions.concat([
            { value: 'ADKAL 7F', label: 'ADKAL 7F' },
            { value: 'GUNIM 7F', label: 'GUNIM 7F' },
            { value: 'GUNIM 7N', label: 'GUNIM 7N' },
            { value: 'LEKAP 7F', label: 'LEKAP 7F' },
            { value: 'PEXEG 7F', label: 'PEXEG 7F' },
            { value: 'PEXEG 7N', label: 'PEXEG 7N' },
            { value: 'RIKBU 7F', label: 'RIKBU 7F' },
            { value: 'SUSIK 7F', label: 'SUSIK 7F' },
            { value: 'SUSIK 7L', label: 'SUSIK 7L' },
            { value: 'TELUV 7F', label: 'TELUV 7F' },
            { value: 'UGABA 7F', label: 'UGABA 7F' },
            { value: 'XIVIL 7F', label: 'XIVIL 7F' },
          ]);
        }
        if (selectedTypeofProcedure.includes('APCH')) {
          filteredOptions = filteredOptions.concat([
            { value: 'RNP_Y', label: 'RNP_Y_RWY_27R' },
          ]);
        }
        this.optionsProcedureName = filteredOptions;
      }
      if (this.Airform.get('selectedRunway')?.value.includes('RWY_09')) {
        if (selectedTypeofProcedure.includes('SID')) {

          filteredOptions = filteredOptions.concat([
            { value: 'UKASO 1D', label: 'UKASO 1D' },
            { value: 'UXENI 1D', label: 'UXENI 1D' },
            { value: 'GUDUM 1D', label: 'GUDUM 1D' },
            { value: 'NIKOT 1D', label: 'NIKOT 1D' },
            { value: 'IKAVA 1D', label: 'IKAVA 1D' },
            { value: 'INTIL 1D', label: 'INTIL 1D' },
            { value: 'LOVGA 1D', label: 'LOVGA 1D' },
          ]);
        }
        if (selectedTypeofProcedure.includes('STAR')) {
          filteredOptions = filteredOptions.concat([
            { value: 'IGOLU 1C', label: 'IGOLU 1C' },
            { value: 'LOVGA 1C', label: 'LOVGA 1C' },
            { value: 'BUBNU 1C', label: 'BUBNU 1C' },
            { value: 'RIDRA 1C', label: 'RIDRA 1C' },
            { value: 'INTIL 1C', label: 'INTIL 1C' },
            { value: 'UXENI 1C', label: 'UXENI 1C' },
          ]);
        }
        if (selectedTypeofProcedure.includes('APCH')) {
          filteredOptions = filteredOptions.concat([
            { value: 'RNP_Y_RWY_09', label: 'RNP_Y_RWY_09' },
          ]);
        }
        this.optionsProcedureName = filteredOptions;
      }
      if (this.Airform.get('selectedRunway')?.value.includes('RWY_27')) {
        if (selectedTypeofProcedure.includes('SID')) {

          filteredOptions = filteredOptions.concat([
            { value: 'UXENI 1B', label: 'UXENI 1B' },
            { value: 'IKAVA 1B', label: 'IKAVA 1B' },
            { value: 'INTIL 1B', label: 'INTIL 1B' },
            { value: 'UKASO 1B', label: 'UKASO 1B' },
            { value: 'LOVGA 1B', label: 'LOVGA 1B' },
            { value: 'GUDUM 1B', label: 'GUDUM 1B' },
            { value: 'NIKOT 1B', label: 'NIKOT 1B' },
          ]);
        }
        if (selectedTypeofProcedure.includes('STAR')) {
          filteredOptions = filteredOptions.concat([
            { value: 'IGOLU 1A', label: 'IGOLU 1A' },
            { value: 'LOVGA 1A', label: 'LOVGA 1A' },
            { value: 'INTIL 1A', label: 'INTIL 1A' },
            { value: 'RIDRA 1A', label: 'RIDRA 1A' },
            { value: 'BUBNU 1A', label: 'BUBNU 1A' },
            { value: 'UXENI 1A', label: 'UXENI 1A' },
          ]);
        }
        if (selectedTypeofProcedure.includes('APCH')) {
          filteredOptions = filteredOptions.concat([
            { value: 'RNP_Y_RWY27', label: 'RNP_Y_RWY27' },

          ]);
        }
        this.optionsProcedureName = filteredOptions;
      }
      if (this.Airform.get('selectedRunway')?.value.includes('RWY 20')) {
        if (selectedTypeofProcedure.includes('SID')) {

          filteredOptions = filteredOptions.concat([
            { value: 'BGD1', label: 'BGD1' },
          ]);
        }
        this.optionsProcedureName = filteredOptions;
      }
      if (this.Airform.get('selectedRunway')?.value.includes('RWY 02')) {

        if (selectedTypeofProcedure.includes('APCH')) {
          filteredOptions = filteredOptions.concat([
            { value: 'RNP_Y_RWY02', label: 'RNP_Y_RWY02' },
          ]);
        }
        this.optionsProcedureName = filteredOptions;
      }

      if (this.Airform.get('selectedRunway')?.value.includes('RWY_9R')) {
        if (selectedTypeofProcedure.includes('SID')) {

          filteredOptions = filteredOptions.concat([
            { value: 'AKTIM 7C', label: 'AKTIM 7C' },
            { value: 'ANIRO 7C', label: 'ANIRO 7C' },
            { value: 'GUNIM 7C', label: 'GUNIM 7C' },
            { value: 'GUNIM 7M', label: 'GUNIM 7M' },
            { value: 'LATID 7C', label: 'LATID 7C' },
            { value: 'OPAMO 7C', label: 'OPAMO 7C' },
            { value: 'PEXEG 7C', label: 'PEXEG 7C' },
            { value: 'SAI 7C', label: 'SAI 7C' },
            { value: 'TULNA 7C', label: 'TULNA 7C' },
            { value: 'VAGPU 7C', label: 'VAGPU 7C' },
            { value: 'VEMBO 7C', label: 'VEMBO 7C' },
          ]);
        }

        if (selectedTypeofProcedure.includes('APCH')) {
          filteredOptions = filteredOptions.concat([
            { value: 'RNP_Y_RWY09R', label: 'RNP_Y_RWY09R' },
          ]);
        }
        this.optionsProcedureName = filteredOptions;
      }

      if (this.Airform.get('selectedRunway')?.value.includes('27L_RWY')) {
        if (selectedTypeofProcedure.includes('SID')) {

          filteredOptions = filteredOptions.concat([
            { value: 'AKTIM 7D', label: 'AKTIM 7D' },
            { value: 'ANIRO 7D', label: 'ANIRO 7D' },
            { value: 'GUNIM 7D', label: 'GUNIM 7D' },
            { value: 'GUNIM 7U', label: 'GUNIM 7U' },
            { value: 'LATID 7D', label: 'LATID 7D' },
            { value: 'OPAMO 7D', label: 'OPAMO 7D' },
            { value: 'PEXEG 7D', label: 'PEXEG 7D' },
            { value: 'SAI 7D', label: 'SAI 7D' },
            { value: 'TULNA 7D', label: 'TULNA 7D' },
            { value: 'VAGPU 7D', label: 'VAGPU 7D' },
            { value: 'VEMBO 7D', label: 'VEMBO 7D' },
            { value: 'VEMBO 7Y', label: 'VEMBO 7Y' },
            { value: 'ANIRO 7Y', label: 'ANIRO 7Y' },
          ]);
        }

        if (selectedTypeofProcedure.includes('APCH')) {
          filteredOptions = filteredOptions.concat([
            { value: 'RNP_Y_RWY27L', label: 'RNP_Y_RWY27L' },
          ]);
        }
        this.optionsProcedureName = filteredOptions;
      }
    });

    this.Airform.get('selectedProcedureName')?.valueChanges.subscribe((selectedProcedureName: string) => {
      if(selectedProcedureName.length!==0){
        console.log(selectedProcedureName,"sdjkndjk")
        this.selectedProcedureName=[selectedProcedureName];
         this.updateLayers();
      }
    })
  }

  loadFIR(event: Event) {
    this.stopPropagation(event);
    const layerName = 'India_FIR';
    if (!this.India_FIR) {
      this.India_FIR = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.India_FIR.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.India_FIR)) {
        this.map.removeLayer(this.India_FIR);
      } else {
        this.India_FIR.addTo(this.map).bringToFront();
      }
    }
  }

  loadwaypoint(event: Event) {
    this.stopPropagation(event);
    const layerName = 'significantpoints';
    if (!this.waypointLayer) {
      this.waypointLayer = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.waypointLayer.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.waypointLayer)) {
        this.map.removeLayer(this.waypointLayer);
      } else {
        this.waypointLayer.addTo(this.map).bringToFront();
      }
    }
  }

  loadnonconvlinedata(event: Event) {
    this.stopPropagation(event);
    const layerName = 'nonconvlinedata';
    if (!this.nonConvLineDataLayer) {
      this.nonConvLineDataLayer = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.nonConvLineDataLayer.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.nonConvLineDataLayer)) {
        this.map.removeLayer(this.nonConvLineDataLayer);
      } else {
        this.nonConvLineDataLayer.addTo(this.map).bringToFront();
      }
    }
  }
  loadconvlinedata(event: Event) {
    this.stopPropagation(event);
    const layerName = 'convlinedata';
    if (!this.convLineDataLayer) {
      this.convLineDataLayer = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.convLineDataLayer.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.convLineDataLayer)) {
        this.map.removeLayer(this.convLineDataLayer);
      } else {
        this.convLineDataLayer.addTo(this.map).bringToFront();
      }
    }
  }
  loadnavaids(event: Event) {
    this.stopPropagation(event);
    const layerName = 'navaids';
    if (!this.navaidsLayer) {
      this.navaidsLayer = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.navaidsLayer.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.navaidsLayer)) {
        this.map.removeLayer(this.navaidsLayer);
      } else {
        this.navaidsLayer.addTo(this.map).bringToFront();
      }
    }
  }
  loadcontrolairspace(event: Event) {
    this.stopPropagation(event);
    const layerName = 'controlairspace';
    if (!this.controlairspaceLayer) {
      this.controlairspaceLayer = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.controlairspaceLayer.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.controlairspaceLayer)) {
        this.map.removeLayer(this.controlairspaceLayer);
      } else {
        this.controlairspaceLayer.addTo(this.map).bringToFront();
      }
    }
  }
  loadaerodrome_obstacle(event: Event) {
    this.stopPropagation(event);
    const layerName = 'aerodrome_obstacle';
    if (!this.aerodrome_obstacleLayer) {
      this.aerodrome_obstacleLayer = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.aerodrome_obstacleLayer.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.aerodrome_obstacleLayer)) {
        this.map.removeLayer(this.aerodrome_obstacleLayer);
      } else {
        this.aerodrome_obstacleLayer.addTo(this.map).bringToFront();
      }
    }
  }
  loadrestricted_areas(event: Event) {
    this.stopPropagation(event);
    const layerName = 'restricted_areas';
    if (!this.restricted_areasLayer) {
      this.restricted_areasLayer = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.restricted_areasLayer.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.restricted_areasLayer)) {
        this.map.removeLayer(this.restricted_areasLayer);
      } else {
        this.restricted_areasLayer.addTo(this.map).bringToFront();
      }
    }
  }

  loadairport(event: Event) {
    this.stopPropagation(event);
    const layerName = 'airportdetails';
    if (!this.airportdetails) {
      this.airportdetails = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.airportdetails.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.airportdetails)) {
        this.map.removeLayer(this.airportdetails);
      } else {
        this.airportdetails.addTo(this.map).bringToFront();
      }
    }
  }

  loadairway2() {
    const layerName = 'thailandconvlinedata';
    if (!this.Airway2) {
      this.Airway2 = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.Airway2.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.Airway2)) {
        this.map.removeLayer(this.Airway2);
      } else {
        this.Airway2.addTo(this.map).bringToFront();
      }
    }
  }
  loadthailandenroute() {
    const layerName = 'thailandenroute';
    if (!this.thailandenroute) {
      this.thailandenroute = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.thailandenroute.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.thailandenroute)) {
        this.map.removeLayer(this.thailandenroute);
      } else {
        this.thailandenroute.addTo(this.map).bringToFront();
      }
    }
  }

  loadFIR1() {
    const layerName = 'FIR';
    if (!this.FIR) {
      this.FIR = L.tileLayer.wms(
        this.wmsUrl,
        {
          layers: layerName,
          format: 'image/png',
          transparent: true,
        }
      );
      this.airportLayerGroup.clearLayers();
      this.FIR.addTo(this.map).bringToFront();
    } else {
      if (this.map.hasLayer(this.FIR)) {
        this.map.removeLayer(this.FIR);
      } else {
        this.FIR.addTo(this.map).bringToFront();
      }
    }
  }


  changeLineColor(color: string) {
    this.lineGeoJsonLayer.setStyle({ color });
    this.airportLayerGroup.setStyle({ color });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}