import { Component, HostListener } from '@angular/core';
import { NotamService } from 'src/app/service/Notam/notam.service';
import { SharedService } from 'src/app/service/Notam/shared.service';
import { SharedService as loaderservice } from 'src/app/service/shared.service';

@Component({
  selector: 'app-notam-sidebar',
  templateUrl: './notam-sidebar.component.html',
  styleUrl: './notam-sidebar.component.scss'
})
export class NotamSidebarComponent {

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


  constructor(private notamservice: NotamService,private sharedService:SharedService,private loaderservice:loaderservice){
    this.loaderservice.updateloader(true);
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
    this.loaderservice.updateloader(false);
   })
  }


  selectAllOption(field: any) {
    field.allOptionsChecked = !field.allOptionsChecked
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

  toggleOption(filter: any, option: any) {
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

  submit() {
    this.loaderservice.updateloader(true);
    const selectedFilters: any = {};
    this.filters.forEach(filter => {
      if (filter.options) {
        selectedFilters[filter.name.toLowerCase().replace(/\s+/g, '')] = filter.fliterSelectedOptions;
      } else {
        selectedFilters[filter.name.toLowerCase().replace(/\s+/g, '')] = filter.allOptionsChecked;
      }
    });
    this.sharedService.updateFormValues(selectedFilters);
    this.loaderservice.updateloader(false);
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
}
