import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { SharedService } from 'src/app/service/Weather/shared.service';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrl: './weather-table.component.scss'
})
export class WeatherTableComponent {
  searchText:string=""
  p: number = 1;
  notemanNumber:any="";
  flag:any="";
  @Output() isMinimize:any = new EventEmitter<string>();
  metarData = [
    { icaoCode: 'VECC', status: 'Active', statusColor: 'green', validFrom: '', validTill: '', windDirection: '230', windSpeed: '08KT', windGust: '', visibility: '4000', rvr: '', rwyId: '', weather: 'Haze', clouds: '', temp: '29', dewPoint: '23', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
  ];

  tafData = [
    { icaoCode: 'VECC', status: 'Active', statusColor: 'green', validFrom: '', validTill: '', windDirection: '230', windSpeed: '08KT', windGust: '', visibility: '4000', rvr: '', rwyId: '', weather: 'Haze', clouds: '', temp: '29', dewPoint: '23', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
  ];

  sigmetsData = [
    { icaoCode: 'VECC', status: 'Active', statusColor: 'green', validFrom: '', validTill: '', windDirection: '230', windSpeed: '08KT', windGust: '', visibility: '4000', rvr: '', rwyId: '', weather: 'Haze', clouds: '', temp: '29', dewPoint: '23', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
    { icaoCode: 'VECC', status: 'Active', statusColor: 'yellow', validFrom: '', validTill: '', windDirection: '', windSpeed: '', windGust: '', visibility: '', rvr: '', rwyId: '', weather: '', clouds: '', temp: '', dewPoint: '', pressure: '', ceiling: '' },
  ];

  speciData=[];
  airmetData=[];
  turbulenceData=[];
  windShearData=[];
  adWarningData=[];
  icingData=[];
  grfNotamData=[];
  categoryData=[];

tableMapping:any = {
  selectedMETARs: {
    id: 'metar-table',
    title: 'METAR',
    data: this.metarData
  },
  TAFs: {
    id: 'taf-table',
    title: 'TAF',
    data: this.tafData
  },
  SIGMETs: {
    id: 'sigmet-table',
    title: 'SIGMET',
    data: this.sigmetsData
  },
  SPECI: {
    id: 'speci-table',
    title: 'SPECI',
    data: this.speciData
  },
  AIRMETs: {
    id: 'airmet-table',
    title: 'AIRMET',
    data: this.airmetData
  },
  Turbulence: {
    id: 'turbulence-table',
    title: 'Turbulence',
    data: this.turbulenceData
  },
  WindShear: {
    id: 'windshear-table',
    title: 'Wind Shear',
    data: this.windShearData
  },
  ADWarning: {
    id: 'adwarning-table',
    title: 'AD Warning',
    data: this.adWarningData
  },
  PotentialIcing: {
    id: 'icing-table',
    title: 'Potential Icing',
    data: this.icingData
  },
  GRFNOTAMs: {
    id: 'grfnotam-table',
    title: 'GRF NOTAM',
    data: this.grfNotamData
  },
  Category: {
    id: 'category-table',
    title: 'Category',
    data: this.categoryData
  }
  
  };

  tables:any = [];

isPopupVisible: boolean[][] = [];
selectedRowData: any = null; // To store the clicked row's data
weatherData:any=[];
constructor(
  private sharedService:SharedService
){

}

ngOnInit(){
  this.sharedService.enrouteSidebar$.subscribe((wxm:any) => {
    this.weatherData = wxm;
    console.log('playy-=-=-=-=');
    console.log(this.weatherData);
    // for (const key in this.weatherData) {
    //   if (this.weatherData.hasOwnProperty(key)) {
    //     const isSelected = this.weatherData[key];
    //     const tableConfig = this.tableMapping[key];
  
    //     if (isSelected && tableConfig) {
    //       // If the value is true and table is not already in the list, add it
    //       const tableExists = this.tables.find((table:any) => table.id === tableConfig.id);
    //       if (!tableExists) {
    //         this.tables.push(tableConfig);
    //       }
    //     } else if (!isSelected && tableConfig) {
    //       // If the value is false and table is in the list, remove it
    //       this.tables = this.tables.filter((table:any) => table.id !== tableConfig.id);
    //     }
    //   }
    // }
    Object.entries(this.weatherData).forEach(([key, isSelected]) => {
      const tableConfig = this.tableMapping[key];
    
      if (!tableConfig) return; // Skip if tableConfig is not available
    
      const tableIndex = this.tables.findIndex((table: any) => table.id === tableConfig.id);
    
      if (isSelected && tableIndex === -1) {
        // Add table if selected and not already in the list
        this.tables.push(tableConfig);
      } else if (!isSelected && tableIndex !== -1) {
        // Remove table if not selected and it exists in the list
        this.tables.splice(tableIndex, 1);
      }
    });
    
});
}

togglePopup(tableIndex: number, rowIndex: number, data: any): void {
  // Initialize the popup visibility array if not already
  if (!this.isPopupVisible[tableIndex]) {
    this.isPopupVisible[tableIndex] = [];
  }

  // Close all other popups
  this.isPopupVisible.forEach((table: any[], tIndex: number) => {
    if (table && tIndex === tableIndex) {
      table.forEach((_, rIndex: number) => {
        this.isPopupVisible[tableIndex][rIndex] = false;
      });
    } else if (table) {
      this.isPopupVisible[tIndex] = [];
    }
  });

  // Toggle the popup for the selected row and table
  this.isPopupVisible[tableIndex][rowIndex] = !this.isPopupVisible[tableIndex][rowIndex];
  this.selectedRowData = data;
}

closePopup(tableIndex: number, rowIndex: number): void {
  this.isPopupVisible[tableIndex][rowIndex] = false;
}

// Listen for clicks anywhere on the document
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const targetElement = event.target as HTMLElement;

  // Check if the clicked element is inside a popup or a button
  if (!targetElement.closest('.popup') && !targetElement.closest('.popup-trigger')) {
    // Close all popups
    this.isPopupVisible.forEach((table: any[], tableIndex: number) => {
      if (table) {
        table.forEach((_, rowIndex: number) => {
          this.isPopupVisible[tableIndex][rowIndex] = false;
        });
      }
    });
  }
}


  onLatestClick(){
    // this.p=1;
    //  this.constructPayload("",!this.latest)
    //  this.latest=!this.latest
  }

  constructPayload(filterByFlag:any="",latest:any=undefined,searchStatus:boolean=false){
    
  }

  filterByFlag(flagColor: string) {
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7",flagColor)
    // this.constructPayload(flagColor)
    // this.filteredNotamData = this.notamData.filter((item:any) => item.flag === flagColor);
    // console.log(this.headers,"sdjbmsdb dsh dnb dh fnb he ned jhdb dn jhshdssjhsbksjhd")
  }

  onSearchClick(){
    this.p=1;
   this.constructPayload("",undefined,true)
  } 

  close() {
    this.isMinimize.emit({ status: 0 });
  }
}
