import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/Weather/shared.service';
import { WeatherService } from 'src/app/service/Weather/weather.service';
interface RowItem {
  [key: string]: string;
}

interface ResponseObject {
  name: string | null;
  designator: string | null;
  type: string | null;
  id: number | null;
}

interface ResponseData {
  [key: string]: ResponseObject[];
}

// Define the structure of the final list object
interface ListItem {
  label: string;
  value: number | null;  // Since id can be null, value can also be null
}

interface ComparedRowItem {
  [key: string]: { value: string; flag: boolean };
}

interface ComplexObject {
  title: string;
  columns: string[];
  rows: RowItem[];
}

interface ComparedComplexObject {
  title: string;
  columns: string[];
  rows: ComparedRowItem[];
}
@Component({
  selector: 'app-weather-sidebar',
  templateUrl: './weather-sidebar.component.html',
  styleUrl: './weather-sidebar.component.scss'
})

export class WeatherSidebarComponent {
  @Output() AIXM: EventEmitter<any> = new EventEmitter();

  isCollapsed = false;
  selectedTab='';
  isMultiMapView=false;
  procedureResponse=[];
  multipart1: ListItem[] = [];
  multipart2: ListItem[] = [];
  selectFormat=[
    {
      label:'Airports',
      options: ['VOBL/Bengaluru (KIA)', 'Airport 2', 'Airport 3']
    },
    {
      label:'Runways',
      options: ['Runway 1', 'Runway 2', 'Runway 3']
    },
    {
      label:'Type of Procedures',
      options: ['Procedure 1', 'Procedure 2', 'Procedure 3']
    },
    {
      label:'Procedure Names',
      options: ['Procedure Name 1', 'Procedure Name 2', 'Procedure Name 3']
    },
    {
      label:'Chart Views',
      options: ['Chart View 1', 'Chart View 2', 'Chart View 3']
    },
  ]

  // airports = ['Airport 1', 'Airport 2', 'Airport 3'];
  // runways = ['Runway 1', 'Runway 2', 'Runway 3'];
  // procedures = ['Procedure 1', 'Procedure 2', 'Procedure 3'];
  // procedureNames = ['Procedure Name 1', 'Procedure Name 2', 'Procedure Name 3'];
  // chartViews = ['Chart View 1', 'Chart View 2', 'Chart View 3'];
  Airform !: FormGroup;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private formbuilder: FormBuilder,
    private weatherService: WeatherService
  ){

  }

  optionsAirport: { value: any; label: any; }[] = [];
  optionRunway:{ value: any; label: any; }[]=[];
  optionProviderType:{ value: any; label: any; }[]=[];
  optionsProcedureName: { value: any; label: any; }[] = [];

  

  selectedAirport: string[] = [];
  selectedRunway: string[] = [];
  selectedTypeofProcedure: string[] = [];
  selectedProcedureName: string[] = [];
  selectedProcedureNameShow:any=[];
  isProcedureName=false;
  procedureNames:{value:any;label:any}[]=[];
 
 

  

  ngOnInit(){
  
  }
  
  watchAirportChanges(): void {
  }
  onValueChange(event: Event,dropdownName:string): void {
    
  }

  isSelected(item: string, part: string, index: number): boolean {
    return true
  }
  
  toggleDropdown(): void {
   
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.select');

  }



createList(response: ResponseData, key: string): ListItem[] {
  return response[key].map((item: ResponseObject) => {
      return {
          label: `${item.name || ''} ${item.designator || ''}`,  // Handle null for name, designator, and type
          value: item.id  // id could be null as well
      };
  });
}

areArraysEqual(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

toggledropdown(event: Event, dropmenu:any){

 
}



toggleCheckbox(option: any, dropdownName: string): void {
  const isChecked = this.getCheckedStatus(option, dropdownName); 
  const event = {
    target: {
      value: option,
      checked: !isChecked
    }
  } as unknown as Event; 
  this.onValueChange(event, dropdownName);
}


getCheckedStatus(optionValue: string, dropdownName: string): boolean {
  if (dropdownName === 'typeOfProcedure') {
    return this.isChecked(optionValue);  
  } else if (dropdownName === 'procedureName') {
    return this.isChecked2(optionValue);  
  }
  return false; 
}

isChecked(optionValue: string): boolean {
  return this.Airform.get('selectedTypeofProcedure')?.value.includes(optionValue);
}
isChecked2(optionValue: string): boolean {
  return this.Airform.get('selectedProcedureName')?.value.includes(optionValue);
}

getProcedureNames(){

}

getProcedure(){

}

convertToArray(obj:any) {
  const result:any = [];
  Object.values(obj).forEach((array:any) => {
      array.forEach((item:any) => {
          result.push({ label: item.name + item.designator, value: item.id });
      });
  });
  return result;
};

toggleSelection(item: string, part: string, index: number, value: any): void {

}

onToggle(event:any){
    this.AIXM.emit({E:event,res:this.procedureResponse});
}
}
