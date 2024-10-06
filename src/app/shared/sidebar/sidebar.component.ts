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

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private formbuilder: FormBuilder,
    private pansopsService: PansopsService
  ) {
    console.log(this.activeTab,"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
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
    });

    this.sharedService.sidebar$.subscribe((res) => {
      this.selectedAirac = res;
    });

    if (route === '/ADM/PANS-OPS') {
      this.isMultiMapView = true;
    } else {
      this.isMultiMapView = false;
    }

    if (route === '/NOTAM-Management') {
      this.isNotamTable = true;
    } else {
      this.isNotamTable = false;
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
    this.compareObj = this.compareComplexObjects(this.obj1, this.obj2);
  }

  compareComplexObjects(
    obj1: ComplexObject,
    obj2: ComplexObject
  ): ComparedComplexObject {
    const comparedRows = obj1.rows.map((row1, index) => {
      const row2 = obj2.rows[index];
      if (!row2) return this.transformRow(row1, row1);
      return this.transformRow(row1, row2);
    });

    return {
      title: obj1.title,
      columns: obj1.columns,
      rows: comparedRows,
    };
  }

  private transformRow(row1: RowItem, row2: RowItem): ComparedRowItem {
    const newRow: ComparedRowItem = {};
    for (const key in row1) {
      if (row1.hasOwnProperty(key)) {
        newRow[key] = {
          value: row1[key],
          flag: row1[key] !== row2[key],
        };
      }
    }
    return newRow;
  }

  flightData = [
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  cropData: any = [this.flightData[0]];

  isExpanded: boolean = true;

  isAIXM = false;
  weatherSelectedTab=' ';

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.cropData = [this.flightData[0]];
  }

  navigateToMultiMap() {
    this.router.navigate(['/ADM']);
    this.isMultiMapView = false;
    this.isAIXM = false;
    this.selectedTab = '';
  }

  navigateToWeatherModule() {
    this.weatherSelectedTab = 'PANS-OPS';
    this.router.navigate(['weather','PANS-OPS']);
  }

  navigateToFullMap() {
    this.selectedTab = 'PANS-OPS';
    this.sharedService.updateSidebarContent({ status: 1 });
    this.isMultiMapView = true;
  }

  onToggleChange(event: any) {
    if (event.E.target.checked) {
      this.isAIXM = true;
      this.procedureAixmTable(event.res);
    } else {
      this.isAIXM = false;
    }
  }

  procedureAixmTable(resp: any) {
    let flghtData = [];
    for (let key in resp) {
      if (resp.hasOwnProperty(key)) {
        console.log(`Key: ${key}`);
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
          title: key,
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
    // console.log('fffff', flghtData)
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

  minimize(event: any) {
    this.isNotamTable = !this.isNotamTable;
    this.isminNotam = !this.isminNotam;
  }
}
