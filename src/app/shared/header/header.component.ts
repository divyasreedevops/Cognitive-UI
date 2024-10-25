import { Component, EventEmitter, Input, Output,HostListener} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SharedService } from 'src/app/service/shared.service';
import { PansopsService } from 'src/app/service/Adm/Pansops/pansops.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '*',
        opacity: 1,
      })),
      state('out', style({
        height: '0',
        opacity: 0,
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
export class HeaderComponent {
  isHeaderOpen = true;
  @Input() name: string = ''; // Default empty string
  @Input() icon: string = ''; // Default empty string
  // activeButton: string = ''; // Track which button is active ('adm' or 'wxm')
  @Input() activeButton: string = ''; // Receive the active button from parent
  @Input() backgroundColor: string = '';
  @Input() textColor: string = '';
  @Output() activeChange = new EventEmitter<string>(); // Emit active button change
  @Input() navInfo:any={};
  selectedOption: string = 'AIRAC 2402';  // Default selected option
  dropdownOptions: any[] = [];
  searchQuery = '';
  

  isDropdownOpen = false;
  selectedItem: any = null; // The initially selected item, if any
  selectedIcon = '';
 
  constructor(private service : SharedService,private pansopsService:PansopsService,private router:Router){
    this.pansopsService.getAiracInfo().subscribe(response=>{
      this.dropdownOptions=response;
      this.dropdownOptions.push({id:"compare",process_name:"compare"})
   const activeDropdown=   this.dropdownOptions.find((ele:any)=>ele.status==="active");
   this.selectedOption=activeDropdown.id;
     this.service.updateSideBar(this.selectedOption);
        this.service.setAiracInfo(this.dropdownOptions);
           this.pansopsService.getAirports().subscribe(response=>{
            this.service.setAirportData(response);
   
   })
      })
  }

  ngOnInit(){
    this.selectedIcon='';
    this.selectedItem='';
  }

  ngAfterViewInit(){

    this.service.navbar$.subscribe((selectedNav:any) => {
      this.selectedIcon='';
      this.selectedItem='';
      const foundItem = this.navInfo.navBtn.find((item: any) => item.icon_name === selectedNav);
      if (foundItem) {
        this.selectedIcon = foundItem.icon_url;
        this.selectedItem = foundItem.icon_name;
      }
    })
  }
  // Method to emit the button clicked event
  setActive(button: string) {
    this.activeChange.emit(button);
    this.service.updatenavbar(button);
    setTimeout(() => {
      this.router.navigate(['/videoclip']); 
    }, 100);
  }

  // Toggles the state of the navbar (open or closed).
  toggleNavbar() {
    this.isHeaderOpen = !this.isHeaderOpen;
  }

  /**
 * Sends the selected dropdown option to the sidebar.
 * This updates the shared service with the currently selected AIRAC option.
 */
  sendDropdownOption(){
    this.service.updateSideBar(this.selectedOption);
  }

 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectItem(item: any) {
    // Check if the selected item is the same as the current item
  if (this.selectedItem === item.icon_name) {
    this.isDropdownOpen = false; // Close the dropdown
    return; // Exit the function if it's the same item
  }

  // Set the selected item
  this.selectedItem = item.icon_name;
  this.selectedIcon = item.icon_url;
  this.setActive(item.icon_name);
  this.isDropdownOpen = false;
  }
 
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    const clickedInside = (event.target as HTMLElement).closest('.nav-drop, .drop-options');
  
    if (!clickedInside && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }
}

