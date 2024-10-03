import { Component, HostListener } from '@angular/core';

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
        { name: 'Option 1', checked: false },
        { name: 'Option 2', checked: false },
        { name: 'Option 3', checked: false },
      ],
      fliterSelectedOptions: [],
    },
    {
      name: 'Airports',
      allOptionsChecked: false,
      isOpen: false,
      options: [
        { name: 'Option 1', checked: false },
        { name: 'Option 2', checked: false },
        { name: 'Option 3', checked: false },
      ],
      fliterSelectedOptions: [],
    },
    {
      name: 'Closure',
      allOptionsChecked: false,
      isOpen: false,
      options: [
        { name: 'Option 1', checked: false },
        { name: 'Option 2', checked: false },
        { name: 'Option 3', checked: false },
      ],
      fliterSelectedOptions: [],
    },
    {
      name: 'Facility Downgrade',
      allOptionsChecked: false,
      isOpen: false,
      options: [
        { name: 'Option 1', checked: false },
        { name: 'Option 2', checked: false },
        { name: 'Option 3', checked: false },
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
      allOptionsChecked: false
    }

  ];

  selectAllOption(field: any) {
    field.allOptionsChecked = !field.allOptionsChecked
    for (let element in field.options) {
      field.options[element]['checked'] = field.allOptionsChecked;
    }
    if (field.allOptionsChecked) {
      field.fliterSelectedOptions = ['Option 1', 'Option 2', 'Option 3']
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
    const selectedFilters: any = {};
  
    // Iterate over the filters and build the object structure
    this.filters.forEach(filter => {
      if (filter.options) {
        // If there are options, collect selected ones
        selectedFilters[filter.name.toLowerCase().replace(/\s+/g, '')] = filter.fliterSelectedOptions;
      } else {
        // For boolean values (without options), collect checked status
        selectedFilters[filter.name.toLowerCase().replace(/\s+/g, '')] = filter.allOptionsChecked;
      }
    });
  
    console.log('Selected Filters:', selectedFilters);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    this.filters.forEach(filter => {
      // If the dropdown is open and the click was outside it
      if (filter.isOpen && !target.closest('.dropdown')) {
        filter.isOpen = false; // Close the dropdown
      }
    });
  }
}
