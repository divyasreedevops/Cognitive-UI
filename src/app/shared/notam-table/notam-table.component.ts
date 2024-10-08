import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NotamService } from 'src/app/service/Notam/notam.service';
import { SharedService } from 'src/app/service/Notam/shared.service';
@Component({
  selector: 'app-notam-table',
  templateUrl: './notam-table.component.html',
  styleUrl: './notam-table.component.scss'
})
export class NotamTableComponent implements OnInit {

   pageNo=0;
   notamData:any = [
  ];
  filteredNotamData: any[] = [];
  @Output() showCircles: EventEmitter<any> = new EventEmitter<any>();
  p: number = 1;
  total: number =0;
  constructor(private notamservice: NotamService,private sharedService:SharedService, private mapService: SharedService){
    this.sharedService.formValues$.subscribe((response:any)=>{
      if(response){
        const payload={
          "pageNo":this.pageNo,
          "dataFilters":{
            "fir":response.fir,
            "airport":response.airports,
            "airSpaceEnr":response['airspace/enr'],
            "airPortClosure":response.closure.includes('Airport Closure'),
            "airSpaceClosure":response.closure.includes('Enroute Clouser')
           }
        }
        this.notamservice.getNotamList(payload).subscribe((res:any)=>{
          this.notamData=res.data;
          this.filteredNotamData=[...this.notamData]
          
this.sharedService.notamDataList(res.data);
        })
      }
    
    })
  }


  
  ngOnInit(): void {
    this.getTableData({
      "pageNo":this.p-1,
      "dataFilters":{
        "airPortClosure":false,
        "airSpaceClosure":false
       }
    });

    this.sharedService.formValues$.subscribe((data)=>{
      if(data){
        this.p=1;
        const payload={
          "pageNo":this.p-1,
          "dataFilters":{
            "fir":data.fir,
            "airport":data.airports,
            "airSpaceEnr":data['airspace/enr'],
            "facilityDownGrade":data['facilitydowngrade'],
            "airPortClosure":data.closure.includes('Airport Closure'),
            "airSpaceClosure":data.closure.includes('Enroute Clouser')
           }
        }
        this.getTableData(payload)
      }
        console.log(data,"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    })
  }


  getTableData(payload:any){
   
    this.notamservice.getNotamList(payload).subscribe((res:any)=>{
      this.notamData=res.data;
      this.filteredNotamData=[...this.notamData]
      this.total=res.totalCount;
   this.sharedService.notamDataList(res.data);
    })
  }

  isShowPopup:boolean=false;
  notemanNumber:any="";
  flag:any="";
  @Output() isMinimize:any = new EventEmitter<string>();

 
 
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
    const circleData = {
      val: true,       // Trigger to show circles
      status: 1,       // You can add other status or relevant information
      mapType: 'dark', // Example of another value, like the map type
      radius: 100000   // Example radius value to control the size of circles
    };
  
    this.mapService.emitCircleData(circleData);
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


  onPageChnage($event:any){

   this.p=$event;
   const payload={
    "pageNo":this.p-1,
    "dataFilters":{
      "fir":"",
      "airport":"",
      "airSpaceEnr":"",
      "airPortClosure":false,
      "airSpaceClosure":false
     }
  }
this.getTableData(payload)
  }

 

}
