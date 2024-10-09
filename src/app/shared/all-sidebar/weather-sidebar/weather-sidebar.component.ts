import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PansopsService } from 'src/app/service/Adm/Pansops/pansops.service';
import { SharedService } from 'src/app/service/shared.service';
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
    private weatherService: WeatherService,
    private pansopsService: PansopsService
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
 
  previousSelectedProcedure:any=[];
  previousSelectedTypeofProcedure:any=[];
  selectedOptionstoshow=[];
  isDropdownVisible = false;
  isProcedureType=false;

  ngOnInit(){
  
    this.Airform = this.formbuilder.group({
      selectedAirport: [[]],
      selectedRunway: [[]],
      selectedTypeofProcedure: [[]],
      selectedProcedureName: [[]],
    });

    this.sharedService.airport$.subscribe((response)=>{
      if(response){
        const transformedAirports = response.map((airport:any) => ({
          value: airport.id,
          label: airport.airport_icao
      }));
      this.optionsAirport=transformedAirports;
      }
     
     })
  }
  
  watchAirportChanges(): void {
  }
  onValueChange(event: Event,dropdownName:string): void {
    const target = event.target as HTMLInputElement; // Narrowing event.target type

    if (!target) {
      return; // Early return if the target is null
    }
      switch(dropdownName){
        case 'airport':
          {
            this.optionRunway=[];
            this.selectedRunway=[];
            this.optionProviderType=[];
            this.selectedTypeofProcedure=[];
            this.procedureNames=[];
            this.selectedProcedureName=[];
            this.selectedProcedureNameShow=[];
            this.previousSelectedProcedure=[];
            this.previousSelectedTypeofProcedure=[];
            this.selectedOptionstoshow=[];
            this.Airform.patchValue({
              
              selectedRunway: [],
              selectedTypeofProcedure: [],
              selectedProcedureName: [],
            });
  
            this.pansopsService.getRunways(this.selectedAirport.toString()).subscribe(response=>{
              const transformesRunways = response.map((runway:any) => ({
                value: runway.id,
                label: runway.designation
            }));
            this.optionRunway=transformesRunways;
            this.sharedService.setRunwayData(response);
           })
          // const formValues = this.Airform.value;
           // this.sharedService.updateFormValues(formValues);
          break;
           }
          
        case 'runway':{
          console.log('dgdgdg----');
          this.optionProviderType=[];
            this.selectedTypeofProcedure=[];
            this.procedureNames=[];
            this.selectedProcedureName=[];
            this.selectedProcedureNameShow=[];
            this.previousSelectedProcedure=[];
            this.previousSelectedTypeofProcedure=[];
            this.selectedOptionstoshow=[];
            this.Airform.patchValue({
              selectedTypeofProcedure: [],
              selectedProcedureName: [],
            });
          this.pansopsService.getProcedureTypes(this.selectedAirport.toString(),this.selectedRunway.toString()).subscribe(response=>{
            console.log('reddd')
            
            const transformesType = response.map((type:any) => ({
              value: type,
              label: type
          }));
          console.log('=====',transformesType);
          this.optionProviderType=transformesType;
          console.log('=====',this.optionProviderType);
         })
         const formValues = this.Airform.value;
        this.sharedService.updateFormValues(formValues);
        break;
        }
        case 'typeOfProcedure':{
          this.selectedOptionstoshow=[];
          const selectedOptions = this.Airform.get('selectedTypeofProcedure')?.value || [];
       console.log(selectedOptions,"typeOfProcedure")
      if (target.checked) {
        // Add selected value
        selectedOptions.push(target.value);
        this.selectedTypeofProcedure.push(target.value);
      } else {
        // Remove deselected value
        const index = selectedOptions.indexOf(target.value);
        if (index > -1) {
          selectedOptions.splice(index, 1);
          this.selectedTypeofProcedure.splice(index, 1);
        }
      }
    
      // Update the form control with new selected options
      this.Airform.get('selectedTypeofProcedure')?.setValue(selectedOptions);
  
  
        //   this.pansopsService.getProcedureNames(this.selectedAirport.toString(),this.selectedRunway.toString(),this.selectedTypeofProcedure.toString(),{
        //     "airport_icao": "VOBL",
        //        "rwy_dir":"09L",
        //        "type": ["SID","STAR","APCH"],
        //        "airac_id":"123e4567-e89b-12d3-a456-426614174000"
        //    }).subscribe(response=>{
        //   response= this.convertToArray(response)
          
        //   this.procedureNames=response;
        //   console.log(this.procedureNames,"this.procedureNames")
        //  })
          // procedureNames
          // const formValues = this.Airform.value;
          // this.sharedService.updateFormValues(formValues);
          break;
        }
          case 'procedureName':{
            const selectedOptions = this.Airform.get('selectedProcedureName')?.value || [];
    
            if (target.checked) {
              // Add selected value
              selectedOptions.push(target.value);
              this.selectedProcedureName.push(target.value);
              const name:any = this.procedureNames.find(procedure => procedure.value == target.value);
              if(name){
               this.selectedProcedureNameShow.push(name.label);
              }
            } else {
              // Remove deselected value
              const index = selectedOptions.indexOf(target.value);
              if (index > -1) {
                selectedOptions.splice(index, 1);
                this.selectedProcedureName.splice(index, 1);
                this.selectedProcedureNameShow.splice(index, 1);
              }
            }
          
            // Update the form control with new selected options
            this.Airform.get('selectedProcedureName')?.setValue(selectedOptions);
  
            
            // this.pansopsService.getProcedure({
            //   "procedure_id":["1"]
            //   }).subscribe(response=>{
            //     console.log(response,"HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
            //   })
            
            break;
          }
  
      }
  }

  isSelected(item: string, part: string, index: number): boolean {
    return true
  }
  
  toggleDropdown(): void {
    console.log('clickkk...');
    this.isDropdownVisible = !this.isDropdownVisible;
    
      const formValues = this.Airform.value;
  
    if(!this.areArraysEqual(formValues['selectedProcedureName'], this.previousSelectedProcedure)){ 
      console.log('huhu ',formValues);
      this.sharedService.updateFormValues(formValues);
      this.sharedService.setProcedureData(formValues['selectedProcedureName']);
      this.getProcedure();
      this.previousSelectedProcedure = [...formValues['selectedProcedureName']];
  
    }
  }
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    
    const target = event.target as HTMLElement;
    console.log(target);
    const clickedInside = target.closest('.select');
    console.log('click outside... ',clickedInside);

    if (!clickedInside) {
      this.isDropdownVisible = false; 
      if (this.isProcedureName) {
        this.isProcedureName = false; 
        if(!this.areArraysEqual(this.selectedProcedureName, this.previousSelectedProcedure)){
        this.getProcedure();
        this.previousSelectedProcedure = [...this.selectedProcedureName];
        // const formValues = this.Airform.value;
        // this.sharedService.updateFormValues(formValues);
        }
      }
      if(this.isProcedureType){
        this.isProcedureType = false;
        if (!this.areArraysEqual(this.selectedTypeofProcedure, this.previousSelectedTypeofProcedure)) {
          this.procedureNames=[];
          this.selectedProcedureName=[];
          this.selectedProcedureNameShow=[];
          this.previousSelectedProcedure=[];
          this.Airform.patchValue({
            selectedProcedureName: [],
          });

       
        this.previousSelectedTypeofProcedure = [...this.selectedTypeofProcedure];
        // const formValues = this.Airform.value;
        // this.sharedService.updateFormValues(formValues);
        }
      }
    }
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

  switch(dropmenu){
    case "type":
      event.stopPropagation();
      this.isProcedureType = !this.isProcedureType;
      if (!this.areArraysEqual(this.selectedTypeofProcedure, this.previousSelectedTypeofProcedure)) {
        this.procedureNames=[];
        this.selectedProcedureName=[];
        this.previousSelectedProcedure=[];
        this.selectedProcedureNameShow=[];
        this.Airform.patchValue({
          selectedProcedureName: [],
        });
      this.getProcedureNames();
      this.previousSelectedTypeofProcedure = [...this.selectedTypeofProcedure];
      // const formValues = this.Airform.value;
      // this.sharedService.updateFormValues(formValues);
      }
      break;
    case "name":
      event.stopPropagation();
      this.isProcedureName = !this.isProcedureName;
      if(!this.areArraysEqual(this.selectedProcedureName, this.previousSelectedProcedure)){
        this.getProcedure();
        this.previousSelectedProcedure = [...this.selectedProcedureName];
        // const formValues = this.Airform.value;
        // this.sharedService.updateFormValues(formValues);
      }
      break;
  }
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
  this.pansopsService.getProcedureNames(this.selectedAirport.toString(),this.selectedRunway.toString(),this.selectedTypeofProcedure.toString(),{
    "airport_icao": this.Airform.get('selectedAirport')?.value,
       "rwy_dir":this.Airform.get('selectedRunway')?.value,
       "type": this.Airform.get('selectedTypeofProcedure')?.value,
   }).subscribe(response=>{
  response= this.convertToArray(response)
  
  this.procedureNames=response;
 })
}

getProcedure(){
  this.pansopsService.getProcedure({
    "procedure_id":this.Airform.get('selectedProcedureName')?.value
    }).subscribe(response=>{
        this.sharedService.setProcedureData(response)
       this.procedureResponse=response;
    })
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

onsubmit(){
   console.log(this.Airform.value);
   const formValues = this.Airform.value;
   this.sharedService.updateFormValues(formValues);
}
}
