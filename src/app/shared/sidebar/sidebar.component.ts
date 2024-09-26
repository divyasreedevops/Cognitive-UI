import { Component, HostListener } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PansopsService } from 'src/app/service/Adm/Pansops/pansops.service';

interface RowItem {
  [key: string]: string;
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
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        width: '5vw',
        opacity: 1,
      })),
      state('out', style({
        width: '19vw',
        opacity: 1,
      })),
      transition('in => out', [
        animate('300ms ease-in-out')
      ]),
      transition('out => in', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class SidebarComponent {
  isCollapsed = false;
  selectedTab='';
  isMultiMapView=false;

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

  optionsAirport: { value: any; label: any; }[] = [
    { value: 'VOBL/Bengaluru (KIA)', label: 'VOBL/BLR/Bengaluru' },
    { value: 'VEPY/PAKYONG', label: 'VEPY/PYG/Pakyong' },
    { value: 'VIJP/JAIPUR', label: 'VIJP/JAI/Jaipur' },];
   optionRunway:{ value: any; label: any; }[]=[];
  optionProviderType:{ value: any; label: any; }[]=[];


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

  selectedAirport: string[] = [];
  selectedRunway: string[] = [];
  selectedTypeofProcedure: string[] = [];
  selectedProcedureName: string[] = [];
  isCompare=false;

  procedureNames:{value:any;label:any}[]=[];

  multipart2=['AKTIM 7A','GUNIM 7A','ANIRO 7A'];

  multipart1=['AKTIM 7A','GUNIM 7A','ANIRO 7A'];
  selectedOptions: string[] = [];
  selectedOptionstoshow: string[] = [];
  isDropdownVisible = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private formbuilder: FormBuilder,
    private pansopsService: PansopsService
  ){

  }
  obj1:any={
    title: "AKTIM 7A",
    columns: [
      "Waypoint Identifier",
      "Path Descriptor",
      "Fly Over",
      "Course Angle °M(°T)",
      "Turn Direction",
      "Upper Limit Altitude ft",
      "Lower Limit Altitude ft",
      "Speed Limit kt",
      "TM DST NM",
      "VA",
      "Navigation specification"
    ],
    rows: [
      {
        waypointIdentifier: "-",
        pathDescriptor: "VA",
        flyOver: "-",
        courseAngle: "272°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "3.32",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "DER27",
        pathDescriptor: "DF",
        flyOver: "-",
        courseAngle: "-",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "3.32",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT1",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "272°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "7.59",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT2",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "280°",
        turnDirection: "R",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "+6000.00",
        speedLimit: "-",
        tmDst: "2.57",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT3",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "356°",
        turnDirection: "L",
        upperLimitAltitude: "-8000",
        lowerLimitAltitude: "-",
        speedLimit: "230",
        tmDst: "3.48",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT4",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "281°",
        turnDirection: "L",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "1.56",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT5",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "190°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-FL110",
        speedLimit: "-",
        tmDst: "1.59",
        va: "-",
        navigationSpecification: "RNAV1"
      }
    ]
  }

  obj2:any={
    title: "AKTIM 6A",
    columns: [
      "Waypoint Identifier",
      "Path Descriptor",
      "Fly Over",
      "Course Angle °M(°T)",
      "Turn Direction",
      "Upper Limit Altitude ft",
      "Lower Limit Altitude ft",
      "Speed Limit kt",
      "TM DST NM",
      "VA",
      "Navigation specification"
    ],
    rows: [
      {
        waypointIdentifier: "-",
        pathDescriptor: "-",
        flyOver: "-",
        courseAngle: "27°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "3.32",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "DER27",
        pathDescriptor: "DF",
        flyOver: "-",
        courseAngle: "-",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "3.32",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT1",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "272°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "7.59",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT2",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "280°",
        turnDirection: "R",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "+6000.00",
        speedLimit: "-",
        tmDst: "2.57",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT3",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "356°",
        turnDirection: "L",
        upperLimitAltitude: "-8000",
        lowerLimitAltitude: "-",
        speedLimit: "230",
        tmDst: "3.48",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT4",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "281°",
        turnDirection: "L",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "1.56",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT5",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "190°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-FL110",
        speedLimit: "-",
        tmDst: "2.55",
        va: "-",
        navigationSpecification: "RNAV1"
      }
    ]
  }
  compareObj:any={};
  ngOnInit(){
    this.isMultiMapView = false;
    const route = localStorage.getItem('currentRoute');
    if(route === '/ADM/PANS-OPS'){
      this.isMultiMapView = true;
    }else{
      this.isMultiMapView = false;
    }

    this.Airform = this.formbuilder.group({
      selectedAirport: [[]],
      selectedRunway: [[]],
      selectedTypeofProcedure: [[]],
      selectedProcedureName: [["PEXEG 7E","ADKAL 7E"]],
    });
    this.isCompare=false;
    this.sharedService.sidebar$.subscribe((option:any) => {
      switch(option){
        case 'Compare':
          this.isCompare=true;
          break;
        case 'AIRAC 2402':
          this.isCompare=false;
          break;
        default:
          this.isCompare=false;
          break;   
      }
    });

    // this.Airform.valueChanges.subscribe(values => {
    //   // Update form values in the shared service
    //   this.sharedService.updateFormValues(values);
    // });

    this.selectedAirport = [];
    this.selectedRunway = [];
    this.selectedTypeofProcedure = [];
    this.selectedProcedureName = [];

   this.watchAirportChanges();

    // Listen for value changes on the entire form
    this.Airform.valueChanges.subscribe((values) => {
      this.onFormValuesChange(values);
    });
    
    this.pansopsService.getAirports().subscribe(response=>{
      const transformedAirports = response.map((airport:any) => ({
        value: airport.id,
        label: airport.airport_icao
    }));
    this.optionsAirport=transformedAirports;
    this.sharedService.setAirportData(response);
   })
    this.compareObj = this.compareComplexObjects(this.obj1, this.obj2);
  }


  onFormValuesChange(values: any): void {
    this.sharedService.updateFormValues(values);
    // Add your logic here
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

  // Triggered on select change, optional for individual selects
  onValueChange(event: Event,dropdownName:string): void {
    switch(dropdownName){
      case 'airport':
        {
          this.pansopsService.getRunways(this.selectedAirport.toString()).subscribe(response=>{
            const transformesRunways = response.map((runway:any) => ({
              value: runway.id,
              label: runway.designation
          }));
          this.optionRunway=transformesRunways;
          this.sharedService.setRunwayData(response);
         })
        break;
         }
        
      case 'runway':{
        this.pansopsService.getProcedureTypes(this.selectedAirport.toString(),this.selectedRunway.toString()).subscribe(response=>{
          const transformesType = response.map((type:any) => ({
            value: type,
            label: type
        }));
        this.optionProviderType=transformesType;
       })
      break;
      }
      case 'typeOfProcedure':{
        this.pansopsService.getProcedureNames(this.selectedAirport.toString(),this.selectedRunway.toString(),this.selectedTypeofProcedure.toString(),{
          "airport_icao": "VOBL",
             "rwy_dir":"09L",
             "type": ["SID","STAR","APCH"],
             "airac_id":"123e4567-e89b-12d3-a456-426614174000"
         }).subscribe(response=>{
        response= this.convertToArray(response)
        this.procedureNames=response;
        console.log(this.procedureNames,"this.procedureNames")
       })
        // procedureNames
        break;
      }
        case 'procedureName':{
          this.pansopsService.getProcedure({
            "procedure_id":["1"]
            }).subscribe(response=>{
              console.log(response,"HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
            })
          break;
        }

    }
    console.log(dropdownName,"dropdownNamedropdownName")
    const formValues = this.Airform.value;
    this.sharedService.updateFormValues(formValues);
  }


  getFormControlName(label: string): string {
    switch (label) {
      case 'Airports':
        return 'selectedAirport';
      case 'Runways':
        return 'selectedRunway';
      case 'Type of Procedures':
        return 'selectedTypeofProcedure';
      case 'Procedure Names':
        return 'selectedProcedureName';
      default:
        return '';
    }
  }

  watchAirportChanges(): void {
    this.Airform.get('selectedAirport')?.valueChanges.subscribe((selectedAirport: string[]) => {
      // Clear all runway and procedure options when the selected airport changes
      this.optionsBengaluruKIARunway = [];
      this.optionsVIJPJAIPURRunway = [];
      this.optionsVEPYPAKYONGRunway = [];
      this.optionsRWY_09LTypeofProcedure = [];
      this.selectedTypeofProcedure = [];




      // Check if VOBL/Bengaluru (KIA) is selected
      if (selectedAirport.includes('VOBL/Bengaluru (KIA)')) {

        // Remove all markers when no airport is selected
        this.optionsBengaluruKIARunway = [
          { value: 'RWY 09L', label: 'RWY 09L' },
          { value: 'RWY_9R', label: 'RWY 09R' },
          { value: '27L_RWY', label: 'RWY 27L' },
          { value: 'RWY 27R', label: 'RWY 27R' },
        ];
        // Set view to Bengaluru
      } else {
        this.optionsBengaluruKIARunway = [];
      }

      // Check if VIJP/JAIPUR is selected
      if (selectedAirport.includes('VIJP/JAIPUR')) {
       
        // Show options for VIJP/JAIPUR
        this.optionsVIJPJAIPURRunway = [
          { value: 'RWY_09', label: 'RWY_08' },
          { value: 'RWY_27', label: 'RWY_26' },
        ];
        // Set view to Jaipur
      } else {
        this.optionsVIJPJAIPURRunway = [];
      }
      // Check if VEPY/PAKYONG is selected
      if (selectedAirport.includes('VEPY/PAKYONG')) {
        // Show options for VEPY/PAKYONG
        this.optionsVEPYPAKYONGRunway = [
          { value: 'RWY 02', label: 'RWY 02' },
          { value: 'RWY 20', label: 'RWY 20' },
        ];
        // Set view to Pakyong
      } else {
        this.optionsVEPYPAKYONGRunway = [];
      }
    });

    this.Airform.get('selectedRunway')?.valueChanges.subscribe((selectedRunway: string[]) => {
      // Reset options for both runways
      this.selectedTypeofProcedure = [];
      this.optionsRWY_09LTypeofProcedure = [];

      // Check if RWY 09L or RWY 27R is selected
      if (selectedRunway.includes('RWY 09L') || selectedRunway.includes('RWY 27R') ||
        selectedRunway.includes('RWY_09') || selectedRunway.includes('RWY 02') ||
        selectedRunway.includes('RWY 20') || selectedRunway.includes('RWY_27') ||
        selectedRunway.includes('RWY_9R') || selectedRunway.includes('27L_RWY')) {

        this.optionsRWY_09LTypeofProcedure = [
          { value: 'SID', label: 'SID' },
          { value: 'STAR', label: 'STAR' },
          { value: 'APCH', label: 'APCH' },
        ];
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
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.cropData=[this.flightData[0]];
  }

  navigateToMultiMap(){
    this.router.navigate(['/ADM']);
    this.isMultiMapView=false;
    this.isAIXM = false;
    this.selectedTab='';
  }

  navigateToFullMap(){
    this.selectedTab='PANS-OPS';
    this.sharedService.updateSidebarContent({status:1});
    this.selectedAirport = [];
    this.selectedRunway = [];
    this.selectedTypeofProcedure = [];
    this.selectedProcedureName = [];
    this.optionsBengaluruKIARunway = [];
    this.optionsVIJPJAIPURRunway = [];
    this.optionsVEPYPAKYONGRunway = [];
    this.optionsRWY_09TypeofProcedure = [];
    this.optionsRWY_27TypeofProcedure = [];
    this.optionsRWY_02TypeofProcedure = [];
    this.optionsRWY_20TypeofProcedure = [];
    this.optionsRWY_09LTypeofProcedure = [];
    this.optionsRWY_27RTypeofProcedure = [];
    this.optionsVEPYTypeofProcedure = [];
    this.optionsProcedureName = [];
    this.isMultiMapView=true;
  }

  flightData =[ {
    title: "AKTIM 7A",
    columns: [
      "Waypoint Identifier",
      "Path Descriptor",
      "Fly Over",
      "Course Angle °M(°T)",
      "Turn Direction",
      "Upper Limit Altitude ft",
      "Lower Limit Altitude ft",
      "Speed Limit kt",
      "TM DST NM",
      "VA",
      "Navigation specification"
    ],
    rows: [
      {
        waypointIdentifier: "-",
        pathDescriptor: "VA",
        flyOver: "-",
        courseAngle: "272°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "3.32",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "DER27",
        pathDescriptor: "DF",
        flyOver: "-",
        courseAngle: "-",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "3.32",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT1",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "272°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "7.59",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT2",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "280°",
        turnDirection: "R",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "+6000.00",
        speedLimit: "-",
        tmDst: "2.57",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT3",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "356°",
        turnDirection: "L",
        upperLimitAltitude: "-8000",
        lowerLimitAltitude: "-",
        speedLimit: "230",
        tmDst: "3.48",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT4",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "281°",
        turnDirection: "L",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "1.56",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT5",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "190°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-FL110",
        speedLimit: "-",
        tmDst: "1.59",
        va: "-",
        navigationSpecification: "RNAV1"
      }
    ]
  },
  {
    title: "AKTIM 7A",
    columns: [
      "Waypoint Identifier",
      "Path Descriptor",
      "Fly Over",
      "Course Angle °M(°T)",
      "Turn Direction",
      "Upper Limit Altitude ft",
      "Lower Limit Altitude ft",
      "Speed Limit kt",
      "TM DST NM",
      "VA",
      "Navigation specification"
    ],
    rows: [
      {
        waypointIdentifier: "-",
        pathDescriptor: "VA",
        flyOver: "-",
        courseAngle: "272°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "3.32",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "DER27",
        pathDescriptor: "DF",
        flyOver: "-",
        courseAngle: "-",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "3.32",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT1",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "272°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "7.59",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT2",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "280°",
        turnDirection: "R",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "+6000.00",
        speedLimit: "-",
        tmDst: "2.57",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT3",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "356°",
        turnDirection: "L",
        upperLimitAltitude: "-8000",
        lowerLimitAltitude: "-",
        speedLimit: "230",
        tmDst: "3.48",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT4",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "281°",
        turnDirection: "L",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "1.56",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT5",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "190°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-FL110",
        speedLimit: "-",
        tmDst: "1.59",
        va: "-",
        navigationSpecification: "RNAV1"
      }
    ]
  }
  ,
  {
    title: "AKTIM 7A",
    columns: [
      "Waypoint Identifier",
      "Path Descriptor",
      "Fly Over",
      "Course Angle °M(°T)",
      "Turn Direction",
      "Upper Limit Altitude ft",
      "Lower Limit Altitude ft",
      "Speed Limit kt",
      "TM DST NM",
      "VA",
      "Navigation specification"
    ],
    rows: [
      {
        waypointIdentifier: "-",
        pathDescriptor: "VA",
        flyOver: "-",
        courseAngle: "272°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "3.32",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "DER27",
        pathDescriptor: "DF",
        flyOver: "-",
        courseAngle: "-",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "3.32",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT1",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "272°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "7.59",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT2",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "280°",
        turnDirection: "R",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "+6000.00",
        speedLimit: "-",
        tmDst: "2.57",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT3",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "356°",
        turnDirection: "L",
        upperLimitAltitude: "-8000",
        lowerLimitAltitude: "-",
        speedLimit: "230",
        tmDst: "3.48",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT4",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "281°",
        turnDirection: "L",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-",
        speedLimit: "-",
        tmDst: "1.56",
        va: "-",
        navigationSpecification: "RNAV1"
      },
      {
        waypointIdentifier: "WYPT5",
        pathDescriptor: "TF",
        flyOver: "-",
        courseAngle: "190°",
        turnDirection: "-",
        upperLimitAltitude: "-",
        lowerLimitAltitude: "-FL110",
        speedLimit: "-",
        tmDst: "1.59",
        va: "-",
        navigationSpecification: "RNAV1"
      }
    ]
  }
];

cropData:any=[this.flightData[0]];

isExpanded: boolean = true;

toggleExpand() {
  
  if(!this.isExpanded){
      this.cropData=[this.flightData[0]];
  }else{
      this.cropData = [...this.cropData,...this.flightData]
  }

  this.isExpanded = !this.isExpanded;
}

isAIXM=false;

onToggleChange(event: any) {
  // Check the checked property of the checkbox
 
  if (event.target.checked) {
   this.isAIXM=true;
   
  } else {
    this.isAIXM=false;

  }
}

toggleSelection(item: string, part: string, index: number): void {
  const uniqueId = `${item}-${part}-${index}`; // Create unique identifier for the item

  const selectedIndex = this.selectedOptions.indexOf(uniqueId);
  if (selectedIndex === -1) {
    // Item is not selected, so add it
    this.selectedOptions.push(uniqueId);
    this.selectedOptionstoshow.push(item);
  } else {
    // Item is already selected, so remove it
    this.selectedOptions.splice(selectedIndex, 1);
    this.selectedOptionstoshow.splice(selectedIndex,1);
  }

  console.log(this.selectedOptions);
}

// Function to check if an item is selected
isSelected(item: string, part: string, index: number): boolean {
  const uniqueId = `${item}-${part}-${index}`;
  return this.selectedOptions.includes(uniqueId);
}

toggleDropdown(): void {
  this.isDropdownVisible = !this.isDropdownVisible;
}

@HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.select');

    if (!clickedInside) {
      this.isDropdownVisible = false; // Hide the dropdown if clicked outside
    }
  }

  compareComplexObjects(obj1: ComplexObject, obj2: ComplexObject): ComparedComplexObject {
    const comparedRows = obj1.rows.map((row1, index) => {
      const row2 = obj2.rows[index];
      if (!row2) return this.transformRow(row1, row1);
      return this.transformRow(row1, row2);
    });

    return {
      title: obj1.title,
      columns: obj1.columns,
      rows: comparedRows
    };
  }

  private transformRow(row1: RowItem, row2: RowItem): ComparedRowItem {
    const newRow: ComparedRowItem = {};
    for (const key in row1) {
      if (row1.hasOwnProperty(key)) {
        newRow[key] = {
          value: row1[key],
          flag: row1[key] !== row2[key]
        };
      }
    }
    return newRow;
  }
}