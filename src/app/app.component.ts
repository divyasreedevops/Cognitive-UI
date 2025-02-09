import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'Demo';
  // headerName = 'Cognitive Navigation';
  // headerIcon = 'assets/images/logo.png';
  activeButton: string = ''; // Track which button is active
  currentRoute: string = '';
  navInfo:any='';
  backgroundColor: string = ''; // New property for background color
  textColor: string = ''; // New property for text color
  constructor(public router: Router,private sharedService: SharedService) {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)) // Narrow the type
      .subscribe(event => {
        this.currentRoute = event.urlAfterRedirects; // Set the current route
        localStorage.setItem('currentRoute' , this.currentRoute);
        this.updateHeaderContent();
        this.updateBackgroundColor(); // Update background class based on the route
      });
  }

  ngOnInit(){

    const storedNav = localStorage.getItem('activeNav');
    if (storedNav) {
      this.activeButton = storedNav;
    }

    this.sharedService.navbar$.subscribe((selectedNav:any) => {
      console.log('from home screen ',selectedNav);
      this.activeButton = selectedNav;
      localStorage.setItem('activeNav', selectedNav);
  });
  }
  setActive(button: string) {
    this.activeButton = button;
  }

  // Check if the current route is login
  isSidebarHide(): boolean {
    const hiddenRoutes = ['/login', '/opsmanager', '/videoclip']; // Add your paths here
    return hiddenRoutes.includes(this.router.url); // Check if the current URL is one of the hidden routes
  }

  isHeaderHide(): boolean {
    const hiddenRoutes = ['/login']; // Add your paths here
    return hiddenRoutes.includes(this.router.url); // Check if the current URL is one of the hidden routes
  }

  updateHeaderContent() {
    
    if(this.currentRoute === '/opsmanager'){
      this.navInfo={
        isTabActive:false,
        isFilterActive:false,
        navBtn:[
          {
            icon_url:'assets/icons/6.png',
            icon_name:'ADM',
          },
          {
            icon_url:'assets/icons/7.png',
            icon_name:'WxM',
          },
          {
            icon_url:'assets/icons/4.png',
            icon_name:'APM',
          },
          {
            icon_url:'assets/icons/5.png',
            icon_name:'Airworthiness',
          },
          {
            icon_url:'assets/icons/1.png',
            icon_name:'FPM',
          },
          {
            icon_url:'assets/icons/2.png',
            icon_name:'NOTAM Management',
          },
          {
            icon_url:'assets/icons/8.png',
            icon_name:'Aircraft Tracking',
          },
          {
            icon_url:'assets/icons/triangle.png',
            icon_name:'Dashboard & Reports',
          }
        ],
        navTitle:'AIRLINE OPS MANAGER'
      };
    }
    else if(this.currentRoute === '/ADM/PANS-OPS')  {
      this.navInfo={
        isTabActive:false,
        isFilterActive:true,
        navBtn:[
          {
            icon_url:'assets/icons/6.png',
            icon_name:'ADM',
          },
          {
            icon_url:'assets/icons/7.png',
            icon_name:'WxM',
          },
          {
            icon_url:'assets/icons/4.png',
            icon_name:'APM',
          },
          {
            icon_url:'assets/icons/5.png',
            icon_name:'Airworthiness',
          },
          {
            icon_url:'assets/icons/1.png',
            icon_name:'FPM',
          },
          {
            icon_url:'assets/icons/2.png',
            icon_name:'NOTAM Management',
          },
          {
            icon_url:'assets/icons/8.png',
            icon_name:'Aircraft Tracking',
          },
          {
            icon_url:'assets/icons/triangle.png',
            icon_name:'Dashboard & Reports',
          }
        ],
        navTitle:''
      };
    }
    else {
      
      

      this.navInfo={
        isTabActive:true,
        isFilterActive:false,
        navBtn:[
          {
            icon_url:'assets/icons/6.png',
            icon_name:'ADM',
          },
          {
            icon_url:'assets/icons/7.png',
            icon_name:'WxM',
          },
          {
            icon_url:'assets/icons/4.png',
            icon_name:'APM',
          },
          {
            icon_url:'assets/icons/5.png',
            icon_name:'Airworthiness',
          },
          {
            icon_url:'assets/icons/1.png',
            icon_name:'FPM',
          },
          {
            icon_url:'assets/icons/2.png',
            icon_name:'NOTAM Management',
          },
          {
            icon_url:'assets/icons/8.png',
            icon_name:'Aircraft Tracking',
          },
          {
            icon_url:'assets/icons/triangle.png',
            icon_name:'Dashboard & Reports',
          }
        ],
        navTitle:''
      };
    }
    
    console.log('------------------');
    console.log(this.currentRoute);
    console.log(this.navInfo);
  }

  updateBackgroundColor() {
    if (this.currentRoute === '/opsmanager') {
      this.backgroundColor = '#3E6CA0'; //  Add a background color for '/opsmanager'
      this.textColor = 'white';
    }else{
      this.backgroundColor = '#EEF4FC' // Default background color
      this.textColor = 'black';
    }
  }
}
