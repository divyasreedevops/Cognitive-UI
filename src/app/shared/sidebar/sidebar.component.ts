import { Component } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
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
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private formbuilder: FormBuilder
  ){

  }

  ngOnInit(){
    this.isMultiMapView = false;

    this.Airform = this.formbuilder.group({
      selectedAirport: [[]],
      selectedRunway: [[]],
      selectedTypeofProcedure: [[]],
      selectedProcedureName: [[]],
    });
    // this.sharedService.sidebarContent$.subscribe(() => {
    //   this.isMultiMapView = true;
    // });

    // this.Airform.valueChanges.subscribe(values => {
    //   // Update form values in the shared service
    //   this.sharedService.updateFormValues(values);
    // });

   

    // Listen for value changes on the entire form
    this.Airform.valueChanges.subscribe((values) => {
      console.log(values);
      this.onFormValuesChange(values);
    });
  }


  onFormValuesChange(values: any): void {
    console.log('Form values changed:', values);
    this.sharedService.updateFormValues(values);
    // Add your logic here
  }

  // Triggered on select change, optional for individual selects
  onValueChange(event: Event, label: string): void {
    const formValues = this.Airform.value;

  // Log the changed value and the entire form values
  console.log(`${label} changed to:`, (event.target as HTMLSelectElement).value);
  console.log('Current form values:', formValues);

  // Send the entire form object to the shared service
  this.sharedService.updateFormValues(formValues);
    // Add individual select logic here if needed
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

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.cropData=[this.flightData[0]];
  }

  navigateToMultiMap(){
    this.router.navigate(['/multimaps']);
    this.isMultiMapView=false;
    this.isAIXM = false;
  }

  navigateToFullMap(){
    this.selectedTab='PANS-OPS';
    this.sharedService.updateSidebarContent({status:1});
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
}