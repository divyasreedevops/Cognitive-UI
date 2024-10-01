import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notam-table',
  templateUrl: './notam-table.component.html',
  styleUrl: './notam-table.component.scss'
})
export class NotamTableComponent {

  isShowPopup:boolean=false;
  notemanNumber:any="";
  flag:any="";
  @Output() isMinimize:any = new EventEmitter<string>();

  p: number = 1;
  total: number = 42;
  notamData:any = [
    { sn: 1, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP' ,flag:'red' },
    { sn: 2, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'green' },
    { sn: 3, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 4, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP',flag:'green' },
    { sn: 5, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'green' },
    { sn: 6, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'yellow' },
    { sn: 7, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP',flag:'red' },
    { sn: 8, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'red' },
    { sn: 9, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 10, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP',flag:'yellow' },
    { sn: 11, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'yellow' },
    { sn: 12, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'green' },
    { sn: 13, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 14, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 1, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP' ,flag:'red' },
    { sn: 2, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'green' },
    { sn: 3, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 4, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP',flag:'green' },
    { sn: 5, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'green' },
    { sn: 6, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'yellow' },
    { sn: 7, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP',flag:'red' },
    { sn: 8, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'red' },
    { sn: 9, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 10, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP',flag:'yellow' },
    { sn: 11, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'yellow' },
    { sn: 12, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'green' },
    { sn: 13, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 14, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 1, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP' ,flag:'red' },
    { sn: 2, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'green' },
    { sn: 3, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 4, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP',flag:'green' },
    { sn: 5, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'green' },
    { sn: 6, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'yellow' },
    { sn: 7, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP',flag:'red' },
    { sn: 8, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'red' },
    { sn: 9, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 10, notamNumber: 'V0593/24', status: 'Active', airport: 'VECC', traffic: 'IFR', purpose: 'Aerodrome', scope: '', series: 'New', type: 'TEMP',flag:'yellow' },
    { sn: 11, notamNumber: 'A1584/24', status: 'Active', airport: 'VIDP', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'TEMP',flag:'yellow' },
    { sn: 12, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'green' },
    { sn: 13, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
    { sn: 14, notamNumber: 'A1565/24', status: 'Active', airport: 'VOBL', traffic: 'VFR', purpose: 'Enroute', scope: '', series: 'New', type: 'PERM',flag:'red' },
  ];
  filteredNotamData: any[] = [...this.notamData];
  headers = [
    { label: 'S/N', isOpen: false, opt: [], selectedOptions: [] as string[] },  // Define selectedOptions as string[]
    { label: 'NOTAM Number', isOpen: false, opt: [], selectedOptions: [] as string[] },
    { label: 'Status', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'Airport', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'FIR Regions', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'Airspace/ENR', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'Qualifier 1', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'Qualifier 2', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'Traffic', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'Purpose', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'Scope', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'Series', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'Type', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] },
    { label: 'PERM/TEMP', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], selectedOptions: [] as string[] }
  ];

  toggleDropdown(index: number) {
    // Toggle the isOpen property for the clicked header
    this.headers[index].isOpen = !this.headers[index].isOpen;
    
    // Optional: Close all other dropdowns when one is opened
    this.headers.forEach((header, i) => {
      if (i !== index) {
        header.isOpen = false;
      }
    });
  }

  onCheckboxChange(headerIndex: number, option: string, event: any) {
    const header:any = this.headers[headerIndex];

    if (event.target.checked) {
      // Add the option to selectedOptions if it's checked
      header.selectedOptions.push(option);
    } else {
      // Remove the option from selectedOptions if it's unchecked
      const index = header.selectedOptions.indexOf(option);
      if (index > -1) {
        header.selectedOptions.splice(index, 1);
      }
    }
  }
  
  showPopup(noteNum:any,flag:any){
    this.notemanNumber = noteNum;
    this.flag = flag;
    this.isShowPopup = true;
  }

  close(){
    this.isMinimize.emit({status:0})
  }

  filterByFlag(flagColor: string) {
    this.filteredNotamData = this.notamData.filter((item:any) => item.flag === flagColor);
  }

  latest(){
    this.filteredNotamData = [...this.notamData];
  }
  pageChangeEvent(event: number){
    this.p=event;
  }

}
