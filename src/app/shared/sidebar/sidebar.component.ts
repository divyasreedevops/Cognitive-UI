import { Component, HostListener } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { PansopsService } from 'src/app/service/Adm/Pansops/pansops.service';
import { combineLatest } from 'rxjs';
import { SharedService as wxmSharedService } from 'src/app/service/Weather/shared.service';
import { SharedService as NotamSharedService } from 'src/app/service/Notam/shared.service';
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
  value: number | null; // Since id can be null, value can also be null
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
      state(
        'in',
        style({
          width: '5vw',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          width: '19vw',
          opacity: 1,
        })
      ),
      transition('in => out', [animate('300ms ease-in-out')]),
      transition('out => in', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class SidebarComponent {
  isCollapsed = false;
  selectedTab = '';
  isMultiMapView = false;
  procedureResponse = [];
  multipart1: ListItem[] = [];
  multipart2: ListItem[] = [];
  isshowloader=false;
  selectedRunway: string[] = [];
  selectedTypeofProcedure: string[] = [];


  optionsAirport: { value: any; label: any }[] = [
    { value: 'VOBL/Bengaluru (KIA)', label: 'VOBL/BLR/Bengaluru' },
    { value: 'VEPY/PAKYONG', label: 'VEPY/PYG/Pakyong' },
    { value: 'VIJP/JAIPUR', label: 'VIJP/JAI/Jaipur' },
  ];
  optionRunway: { value: any; label: any }[] = [];
  optionProviderType: { value: any; label: any }[] = [];
   activeTab = localStorage.getItem('activeNav');
   
  isCompare = false;

  isDropdownVisible = false;
  isNotamTable = false;
  isminNotam = false;
  isEnrouteTable=false;
  isminEnroute=false;
  isairportTable=false;
  isminairport=false;
  isApmSidebar=false;
  isAPMTable=false;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private formbuilder: FormBuilder,
    private pansopsService: PansopsService,
    private wxmSharedService: wxmSharedService,
    private notamSharedService: NotamSharedService
  ) {
  }


  filterByFlag(status:any){
     if(this.isminNotam){
           this.notamSharedService.updateMapFilters(status)
     }
   
  }
  obj1: any = {
    title: 'AKTIM 7A',
    columns: [
      'Waypoint Identifier',
      'Path Descriptor',
      'Fly Over',
      'Course Angle °M(°T)',
      'Turn Direction',
      'Upper Limit Altitude ft',
      'Lower Limit Altitude ft',
      'Speed Limit kt',
      'TM DST NM',
      'VA',
      'Navigation specification',
    ],
    rows: [
      {
        waypointIdentifier: '-',
        pathDescriptor: 'VA',
        flyOver: '-',
        courseAngle: '272°',
        turnDirection: '-',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '-',
        speedLimit: '-',
        tmDst: '3.32',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'DER27',
        pathDescriptor: 'DF',
        flyOver: '-',
        courseAngle: '-',
        turnDirection: '-',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '-',
        speedLimit: '-',
        tmDst: '3.32',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'WYPT1',
        pathDescriptor: 'TF',
        flyOver: '-',
        courseAngle: '272°',
        turnDirection: '-',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '-',
        speedLimit: '-',
        tmDst: '7.59',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'WYPT2',
        pathDescriptor: 'TF',
        flyOver: '-',
        courseAngle: '280°',
        turnDirection: 'R',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '+6000.00',
        speedLimit: '-',
        tmDst: '2.57',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'WYPT3',
        pathDescriptor: 'TF',
        flyOver: '-',
        courseAngle: '356°',
        turnDirection: 'L',
        upperLimitAltitude: '-8000',
        lowerLimitAltitude: '-',
        speedLimit: '230',
        tmDst: '3.48',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'WYPT4',
        pathDescriptor: 'TF',
        flyOver: '-',
        courseAngle: '281°',
        turnDirection: 'L',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '-',
        speedLimit: '-',
        tmDst: '1.56',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'WYPT5',
        pathDescriptor: 'TF',
        flyOver: '-',
        courseAngle: '190°',
        turnDirection: '-',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '-FL110',
        speedLimit: '-',
        tmDst: '1.59',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
    ],
  };

  obj2: any = {
    title: 'AKTIM 6A',
    columns: [
      'Waypoint Identifier',
      'Path Descriptor',
      'Fly Over',
      'Course Angle °M(°T)',
      'Turn Direction',
      'Upper Limit Altitude ft',
      'Lower Limit Altitude ft',
      'Speed Limit kt',
      'TM DST NM',
      'VA',
      'Navigation specification',
    ],
    rows: [
      {
        waypointIdentifier: '-',
        pathDescriptor: '-',
        flyOver: '-',
        courseAngle: '27°',
        turnDirection: '-',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '-',
        speedLimit: '-',
        tmDst: '3.32',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'DER27',
        pathDescriptor: 'DF',
        flyOver: '-',
        courseAngle: '-',
        turnDirection: '-',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '-',
        speedLimit: '-',
        tmDst: '3.32',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'WYPT1',
        pathDescriptor: 'TF',
        flyOver: '-',
        courseAngle: '272°',
        turnDirection: '-',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '-',
        speedLimit: '-',
        tmDst: '7.59',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'WYPT2',
        pathDescriptor: 'TF',
        flyOver: '-',
        courseAngle: '280°',
        turnDirection: 'R',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '+6000.00',
        speedLimit: '-',
        tmDst: '2.57',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'WYPT3',
        pathDescriptor: 'TF',
        flyOver: '-',
        courseAngle: '356°',
        turnDirection: 'L',
        upperLimitAltitude: '-8000',
        lowerLimitAltitude: '-',
        speedLimit: '230',
        tmDst: '3.48',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'WYPT4',
        pathDescriptor: 'TF',
        flyOver: '-',
        courseAngle: '281°',
        turnDirection: 'L',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '-',
        speedLimit: '-',
        tmDst: '1.56',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
      {
        waypointIdentifier: 'WYPT5',
        pathDescriptor: 'TF',
        flyOver: '-',
        courseAngle: '190°',
        turnDirection: '-',
        upperLimitAltitude: '-',
        lowerLimitAltitude: '-FL110',
        speedLimit: '-',
        tmDst: '2.55',
        va: '-',
        navigationSpecification: 'RNAV1',
      },
    ],
  };
  compareObj: any = {};
  airacs = [];
  compareAiracValues = {};
  selectedAirac = '';
  ngOnInit() {
    this.isMultiMapView = false;
    const route = localStorage.getItem('currentRoute');
    this.sharedService.airac$.subscribe((airacRes) => {
      this.airacs = airacRes;
      this.isAIXM = false;
    });

    this.sharedService.sidebar$.subscribe((res) => {
      this.selectedAirac = res;
    });

    if (route === '/ADM/PANS-OPS' || route === '/weather/PANS-OPS') {
      const tab = localStorage.getItem("wxmTab");
      console.log('selected tab ',tab);
      if(tab){
        this.weatherSelectedTab = tab;
      }
      this.isMultiMapView = true;
    } else {
      this.isMultiMapView = false;
    }

    if (route === '/NOTAM-Management') {
      this.isNotamTable = true;
      this.notamSharedService.notamTableStatusUpdate(true)
    } else {
      this.isNotamTable = false;
      this.notamSharedService.notamTableStatusUpdate(false)
    }
    if(route === '/APM'){
      this.isAPMTable=true;
      this.isApmSidebar=true;
    }else{
      this.isAPMTable=false;
      this.isApmSidebar=false;
    }
    this.isCompare = false;
    this.sharedService.sidebar$.subscribe((option: any) => {
      switch (option) {
        case 'compare':
          this.isCompare = true;
          break;
        case 'AIRAC 2402':
          this.isCompare = false;
          break;
        default:
          this.isCompare = false;
          break;
      }
    });

    this.sharedService.airport$.subscribe((response) => {
      if (response) {
        const transformedAirports = response.map((airport: any) => ({
          value: airport.id,
          label: airport.airport_icao,
        }));
        this.optionsAirport = transformedAirports;
      }
    });
    // this.compareObj = this.compareComplexObjects(this.obj1, this.obj2);

    this.sharedService.loader$.subscribe(status=>{
      console.log('loader ',status);
      if(status){
        this.isshowloader=true;
      }else{
        this.isshowloader=false;
      }
  
   })
   this.weatherSelectedTab=' ';
   this.pansopsService.selectedRunway$.subscribe(value => {
    console.log('selectedRunway ', value);
    this.selectedRunway = value;
  });

  this.pansopsService.selectedTypeofProcedure$.subscribe(value => {
    console.log('selectedTypeofProcedure ', value);
    this.selectedTypeofProcedure = value;
  });
  }

  compareComplexObjects(obj1: ComplexObject, obj2: ComplexObject): ComparedComplexObject {
    const comparedRows = obj1.rows.map((row1, index) => {
      const row2 = obj2.rows[index];
      if (!row2) {
        return this.transformRow(row1, row1, true); // Pass 'true' to flag row as extra
      }
      return this.transformRow(row1, row2);
    });
  
    return {
      title: obj1.title,
      columns: obj1.columns,
      rows: comparedRows
    };
  }

  private transformRow(row1: RowItem, row2: RowItem, isExtra: boolean = false): ComparedRowItem {
    const newRow: ComparedRowItem = {};
    
    for (const key in row1) {
      if (row1.hasOwnProperty(key)) {
        newRow[key] = {
          value: row1[key],
          flag: isExtra || row1[key] !== row2[key] // If 'isExtra' is true, flag all fields as extra
        };
      }
    }
    return newRow;
  }

  flightData:any = [];
  cropData: any = [this.flightData[0]];

  isExpanded: boolean = true;

  isAIXM = false;
  weatherSelectedTab=' ';

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.cropData = [this.flightData[0]];
  }

  navigateToMultiMap() {
    const route = localStorage.getItem('currentRoute');
    if(route === '/ADM/PANS-OPS'){
      this.router.navigate(['/ADM']);
      this.isMultiMapView = false;
      this.isAIXM = false;
      this.isCompare=false
      this.selectedTab = '';
    }else if(route === '/weather/PANS-OPS'){
      this.router.navigate(['/weather']);
      this.weatherSelectedTab=' ';
      this.isEnrouteTable=false;
      this.selectedTab = '';
      this.isairportTable=false;
      this.wxmSharedService.updatemap([]);
      this.sharedService.refreshsidebar('');
    }

  }

  navigateToWeatherModule(tab:any) {
    this.weatherSelectedTab = tab;
    localStorage.setItem("wxmTab",this.weatherSelectedTab);
    this.router.navigate(['weather','PANS-OPS']);
    this.isMultiMapView = true;

    tab==='ENR'? this.isEnrouteTable=true : this.isEnrouteTable=false;
    tab==='AIRPORT'? this.isairportTable=true : this.isairportTable=false;

     
  }

  navigateToFullMap() {
    
    this.selectedTab = 'PANS-OPS';
    this.sharedService.updateSidebarContent({ status: 1 });
    this.isMultiMapView = true;
    this.sharedService.updateFormValues([]);
    this.wxmSharedService.updatemap([]);
    this.sharedService.refreshsidebar('');
  }

  navigate(){
    const route = localStorage.getItem('currentRoute');
    if (route === '/ADM/PANS-OPS' || route === '/weather/PANS-OPS') {
      this.isMultiMapView = true;
    } else {
      this.isMultiMapView = false;
    }
  }

  // onToggleChange(event: any) {
  //   if (event.E.target.checked) {
  //     this.isAIXM = true;
  //     this.procedureAixmTable(event.res);
  //   } else {
  //     this.isAIXM = false;
  //   }
  // }
  onToggleChange(event: any) {
    if (event.E.target.checked) {
      this.isAIXM = true;
      this.procedureAixmTable(event.res);
      if (Object.keys(event.res).length === 2){
        this.isCompare = true
        this.obj1 = this.flightData[0];
        this.obj2 = this.flightData[1];
        this.compareObj = this.compareComplexObjects(this.obj1, this.obj2);
        }
        else{
         this.isCompare = false
        }
    } else {
      this.isAIXM = false;
    }
  }

  procedureAixmTable(resp: any) {
    let flghtData = [];
    for (let key in resp) {
      if (resp.hasOwnProperty(key)) {
        let row: any[] = [];
        for (let i = 0; i < resp[key]['waypoints'].length; i++) {
          const tempRow = resp[key]['waypoints'][i];
          let temp = {
            waypointIdentifier: '',
            pathDescriptor: '',
            flyOver: '',
            courseAngle: '',
            turnDirection: '',
            upperLimitAltitude: '',
            lowerLimitAltitude: '',
            speedLimit: '',
            tmDst: '',
            va: '',
            navigationSpecification: '',
          };
          temp.waypointIdentifier =
            tempRow.waypoint && Object.keys(tempRow.waypoint).length
              ? tempRow.waypoint['name'] || '-'
              : '-';
          temp.pathDescriptor = tempRow.path_descriptor
            ? tempRow.path_descriptor
            : '-';
          temp.flyOver = tempRow.fly_over ? tempRow.fly_over : '-';
          temp.turnDirection = tempRow.turn_dir ? tempRow.turn_dir : '-';
          temp.upperLimitAltitude = tempRow.altitude_ul
            ? tempRow.altitude_ul
            : '-';
          temp.lowerLimitAltitude = tempRow.altitude_ll
            ? tempRow.altitude_ll
            : '-';
          temp.speedLimit = tempRow.speed_limit ? tempRow.speed_limit : '-';
          temp.tmDst = tempRow.dst_time ? tempRow.dst_time : '-';
          temp.va = tempRow.vpa_tch ? tempRow.vpa_tch : '-';
          temp.navigationSpecification = tempRow.nav_spec
            ? tempRow.nav_spec
            : '-';
          temp.courseAngle = tempRow.course_angle ? tempRow.course_angle : '-';
          row.push(temp);
        }
        let tempObj = {
          title: resp[key].name,
          columns: [
            'Waypoint Identifier',
            'Path Descriptor',
            'Fly Over',
            'Course Angle °M(°T)',
            'Turn Direction',
            'Upper Limit Altitude ft',
            'Lower Limit Altitude ft',
            'Speed Limit kt',
            'TM DST NM',
            'VA',
            'Navigation specification',
          ],
          rows: row,
        };
        flghtData.push(tempObj);
      }
    }
    this.flightData = flghtData;
    this.cropData = [this.flightData[0]];
  }

  toggleExpand() {
    if (!this.isExpanded) {
      this.cropData = [this.flightData[0]];
    } else {
      this.cropData = [...this.flightData];
    }

    this.isExpanded = !this.isExpanded;
  }

  minimize(event: any,tab:any) {
    switch(tab){
      case "notam":
        this.isNotamTable = !this.isNotamTable;
        this.notamSharedService.notamTableStatusUpdate( this.isNotamTable)
        this.isminNotam = !this.isminNotam;
        break;
      case "wxm":
        this.isEnrouteTable = !this.isEnrouteTable;
        this.isminEnroute = !this.isminEnroute;
        break;
      case "ats":
        this.isairportTable = !this.isairportTable;
        this.isminairport = !this.isminairport;
        break;
    }
    
  }

}
