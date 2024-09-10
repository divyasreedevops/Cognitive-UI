import { Component } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service';
import { Router } from '@angular/router';
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
      options: ['Airport 1', 'Airport 2', 'Airport 3']
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

  constructor(
    private sharedService: SharedService,
    private router: Router
  ){

  }

  ngOnInit(){
    this.isMultiMapView = false;
    this.sharedService.sidebarContent$.subscribe(() => {
      this.isMultiMapView = true;
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateToMultiMap(){
    this.router.navigate(['/multimaps']);
  }
}
