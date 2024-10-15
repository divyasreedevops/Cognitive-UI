import { Component, HostListener } from '@angular/core';
import { NotamService } from 'src/app/service/Notam/notam.service';
import { SharedService } from 'src/app/service/Notam/shared.service';
import { SharedService as loaderservice } from 'src/app/service/shared.service';
import { SharedService as wxmshared } from 'src/app/service/Weather/shared.service';

@Component({
  selector: 'app-apm-sidebar',
  templateUrl: './apm-sidebar.component.html',
  styleUrl: './apm-sidebar.component.scss'
})
export class ApmSidebarComponent {
  additionalInfo: string = '';
  isFilter:any=true;
  isAddMore:any=false;
  filters = [
    {
      name: 'Aircraft Registration',
      allOptionsChecked: false,
      isOpen: false, // To track dropdown open/close
      options: [
        { name: 'Airport Closure', checked: false},
        { name: 'Enroute Clouser', checked: false },
      ],
      fliterSelectedOptions: [],
    },
    {
      name: 'Aircraft Type',
      allOptionsChecked: false,
      isOpen: false,
      options: [
        { name: 'Airport Closure', checked: false},
        { name: 'Enroute Clouser', checked: false },
      ],
      fliterSelectedOptions: [],
    },
    {
      name: 'Departure Airport',
      allOptionsChecked: false,
      isOpen: false,
      options: [
        { name: 'Airport Closure', checked: false},
        { name: 'Enroute Clouser', checked: false },
      ],
      fliterSelectedOptions: [],
    },
    {
      name: 'Destination Airport',
      allOptionsChecked: false,
      isOpen: false,
      options: [
        { name: 'Airport Closure', checked: false},
        { name: 'Enroute Clouser', checked: false },
      ],
      fliterSelectedOptions: [],
    },
    

  ];


  constructor(private notamservice: NotamService,private sharedService:SharedService,private loaderservice:loaderservice, private wxmshared:wxmshared){
  //   this.loaderservice.updateloader(true);
  //  this.notamservice.getNotamFilterOptions().subscribe((response:any)=>{
  //   response.fir.forEach((element:any) => {
  //     this.filters[0].options?.push({ name: element, checked: false })
  //   });

  //   response.airportFir.forEach((element:any) => {
  //     this.filters[1].options?.push({ name: element, checked: false })
  //   });

  //   response.facilityDownGrade.forEach((element:any) => {
  //     this.filters[3].options?.push({ name: element, checked: false })
  //   });
  //   this.loaderservice.updateloader(false);
  //  })
  }


  // {
  //   name: 'FIR',
  //   allOptionsChecked: false,
  //   isOpen: false, // To track dropdown open/close
  //   options: [
  //   ],
  //   fliterSelectedOptions: [],
  // },



  // toggleOption(filter: any, option: any) {
  //   if (filter.options) {
  //     option.checked = !option.checked;
  //     if (option.checked) {
  //       filter.fliterSelectedOptions.push(option.name)
  //     }
  //     else {
  //       filter.fliterSelectedOptions = filter.fliterSelectedOptions.filter((item: any) => item !== option.name);
  //     }
  //   }
  //   else {
  //     filter.checked = !filter.checked
  //   }
  // }
  toggleOption(filter: any, option: any) {
    if (filter.options) {
      if (filter.name === 'Departure Airport' || filter.name === 'Destination Airport') {
        // Single-select logic: uncheck all other options and set the value as a string
        filter.options.forEach((opt: any) => opt.checked = false);
        option.checked = true;
        // Store the selected option as a string instead of an array
        filter.fliterSelectedOptions = option.name;
      } else {
        // Multi-select logic for other filters
        option.checked = !option.checked;
        if (option.checked) {
          filter.fliterSelectedOptions.push(option.name);
        } else {
          filter.fliterSelectedOptions = filter.fliterSelectedOptions.filter((item: any) => item !== option.name);
        }
      }
    }
  }
  
  selectSingleOption(filter: any, option: any) {
    // Set the selected option as a string for single select
    filter.fliterSelectedOptions = option.name;
  
    // Close the dropdown after selection
    filter.isOpen = false;
  }
  

  submit() {
    const selectedFilters: any = {};
    this.filters.forEach(filter => {
      if (filter.options) {
        selectedFilters[filter.name.toLowerCase().replace(/\s+/g, '')] = filter.fliterSelectedOptions;
      } else {
        selectedFilters[filter.name.toLowerCase().replace(/\s+/g, '')] = filter.allOptionsChecked;
      }
    });
    console.log(selectedFilters);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.filters.forEach(filter => {
      if (filter.isOpen && !target.closest('.dropdown')) {
        filter.isOpen = false; // Close the dropdown
      }
    });
  }

  toggleTab(tab:any){
    switch(tab){
      case "filter":
          this.isAddMore = false;
          this.isFilter=true;
      break;
      case "addMore":
          this.isAddMore = true;
          this.isFilter=false;
      break;

    }
  }

  addMoreObj = [
    {
      name: 'Aircraft Registration',
      fliterSelectedOptions: '',
    },
    {
      name: 'Aircraft Type',
      fliterSelectedOptions: '',
    },
    {
      name: 'Departure Airport',
      fliterSelectedOptions: '',
    },
    {
      name: 'Destination Airport',
      fliterSelectedOptions: '',
    },
  ];

  addsubmit() {
    const selectedFilters: any = {};
    this.addMoreObj.forEach(filter => {
      selectedFilters[filter.name.toLowerCase().replace(/\s+/g, '')] = filter.fliterSelectedOptions;
    });
  
    console.log(selectedFilters);
  }
  ngOnDestroy(){

    this.wxmshared.updatemap('this.Airform.value');
  }
}
