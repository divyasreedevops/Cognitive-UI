import { Component, HostListener } from '@angular/core';
import { NotamService } from 'src/app/service/Notam/notam.service';
import { SharedService } from 'src/app/service/Notam/shared.service';
import { SharedService as loaderservice } from 'src/app/service/shared.service';
import { SharedService as wxmshared } from 'src/app/service/Weather/shared.service';

@Component({
  selector: 'app-notam-sidebar',
  templateUrl: './notam-sidebar.component.html',
  styleUrl: './notam-sidebar.component.scss'
})
export class NotamSidebarComponent {
  
  additionalInfo: string = ''; // Stores additional information input by the user
  bufferDistance = '5nm'; // Stores the buffer distance for filtering (default is '5nm')

  // List of filter categories (FIR, Airports, Closure, etc.) with options 
  filters = [
    {
      name: 'FIR',
      allOptionsChecked: false,
      isOpen: false, // To track dropdown open/close
      options: [
      ],
      fliterSelectedOptions: [],
    },
    {
      name: 'Airports',
      allOptionsChecked: false,
      isOpen: false,
      options: [
      ],
      fliterSelectedOptions: [],
    },
    {
      name: 'Closure',
      allOptionsChecked: false,
      isOpen: false,
      options: [
        { name: 'Airport Closure', checked: false},
        { name: 'Enroute Clouser', checked: false },
      ],
      fliterSelectedOptions: [],
    },
    {
      name: 'Facility Downgrade',
      allOptionsChecked: false,
      isOpen: false,
      options: [
      ],
      fliterSelectedOptions: [],
    },
    {
      name: 'Airspace/ENR',
      allOptionsChecked: false,
    },
    {
      name: 'ATC Watch Hours',
      allOptionsChecked: false,
    },
    {
      name: 'Enter Your ATS Plan',
      allOptionsChecked: false,
    }

  ];


  constructor(private notamservice: NotamService,private sharedService:SharedService,private loaderservice:loaderservice, private wxmshared:wxmshared){
    // Display a loading indicator when the component initializes
    this.loaderservice.updateloader(true);

    // Fetch filter options from the NotamService and populate the filters
    this.notamservice.getNotamFilterOptions().subscribe((response:any)=>{

    response.fir.forEach((element:any) => {
      this.filters[0].options?.push({ name: element, checked: false })
    });

    response.airportFir.forEach((element:any) => {
      this.filters[1].options?.push({ name: element, checked: false })
    });

    response.facilityDownGrade.forEach((element:any) => {
      this.filters[3].options?.push({ name: element, checked: false })
    });

    // Update the sidebar filters and hide the loading indicator
    this.sharedService.updateSideBarFilters(response)
    this.loaderservice.updateloader(false);
   })
  }

  // Function to select or deselect all options within a specific filter
  selectAllOption(field: any) {
    /*This function allows the user to select all options
     by checking the master checkbox located beside the field name.*/
    field.allOptionsChecked = !field.allOptionsChecked
    if (field.options){
      field.fliterSelectedOptions = []
      for (let element in field.options) {
        field.options[element]['checked'] = field.allOptionsChecked;
      }
      if (field.allOptionsChecked) {
        field.options.forEach((ele:any)=>{
          field.fliterSelectedOptions.push(ele.name)
        })
      } else {
        field.fliterSelectedOptions = []
      }
    }
  }

  toggleOption(filter: any, option: any) {
    /*This function is use to toggle the Fields*/
    if (filter.options) {
      option.checked = !option.checked;
      if (option.checked) {
        filter.fliterSelectedOptions.push(option.name)
      }
      else {
        filter.fliterSelectedOptions = filter.fliterSelectedOptions.filter((item: any) => item !== option.name);
      }
    }
    else {
      filter.checked = !filter.checked
    }
  }

  // Function to gather all selected filters and submit them to the shared service
  submit() {
      const selectedFilters: any = {};
    this.filters.forEach(filter => {
      if (filter.options) {
        selectedFilters[filter.name.toLowerCase().replace(/\s+/g, '')] = filter.fliterSelectedOptions;
      } else {
        selectedFilters[filter.name.toLowerCase().replace(/\s+/g, '')] = filter.allOptionsChecked;
      }
    });
    selectedFilters['additionalInfo'] = this.additionalInfo;
    selectedFilters['bufferDistance'] = this.bufferDistance;

    this.sharedService.updateFormValues(selectedFilters);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    /*This function is use to close the dropdown when clicked outside the dropdown*/
    const target = event.target as HTMLElement;
    this.filters.forEach(filter => {
      if (filter.isOpen && !target.closest('.dropdown')) {
        filter.isOpen = false; // Close the dropdown
      }
    });
  }

  ngOnDestroy(){
    /*Cleanup method to update the map when the component is destroyed */
    this.wxmshared.updatemap('this.Airform.value');
  }
}
