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
  }

  searchText:string=""
  selectedFilters:any;
  latest:boolean=false;
  
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
        this.selectedFilters=data;
   
//           const dataFilters={
//             "fir":data.fir,
//             "airport":data['airports'],
//             "airSpaceEnr":data['airspace/enr'],
//             "facilityDownGrade":data['facilitydowngrade'],
//             "airPortClosure":data.closure.includes('Airport Closure'),
//             "airSpaceClosure":data.closure.includes('Enroute Clouser')
//            }

// const filteredDataFilters = Object.fromEntries(
//   Object.entries(dataFilters).filter(([key, value]) => {
//       return !Array.isArray(value) || value.length > 0;
//   })
// );
        
//       const payload={
//         "pageNo":this.p-1,
//         "dataFilters":filteredDataFilters
//       }
        this.constructPayload()
      }
    })
  }


  getTableData(payload:any){
   
    this.notamservice.getNotamList(payload).subscribe((res:any)=>{
      this.notamData=res.data;
      this.filteredNotamData=[...this.notamData]
      this.total=res.totalCount;
        

   Object.keys( res.filterData).forEach((element:any)=>{
        const elementFound=  this.headers.find((ele)=>ele.mappingName===element);
        if(elementFound){
          elementFound.opt=res.filterData[element]
        }
      })
console.log(this.headers,"sdcjdmh bdchj nbhjdgvhf")   
      this.sharedService.notamDataList(res.data);
    })
  }

  isShowPopup:boolean=false;
  notemanNumber:any="";
  flag:any="";
  @Output() isMinimize:any = new EventEmitter<string>();

  selectedNotam:any;
 
  headers = [
    { label: 'S/N', isOpen: false, opt: [],mappingName:"", selectedOptions: [] as string[] },  // Define selectedOptions as string[]
    { label: 'NOTAM Number', isOpen: false, opt: [],mappingName:"", selectedOptions: [] as string[] },
    { label: 'Status', isOpen: false, opt: ['active','inactive'],mappingName:"status", selectedOptions: [] as string[] },
    { label: 'Airport', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'],mappingName:"airportFir", selectedOptions: [] as string[] },
    { label: 'FIR Regions', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], mappingName:"fir",selectedOptions: [] as string[] },
    { label: 'Airspace/ENR', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'],mappingName:"airspaceEnr", selectedOptions: [] as string[] },
    { label: 'Qualifier 1', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'],mappingName:"qualifier1", selectedOptions: [] as string[] },
    { label: 'Qualifier 2', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'],mappingName:"qualifier2", selectedOptions: [] as string[] },
    { label: 'Traffic', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], mappingName:"traffic",selectedOptions: [] as string[] },
    { label: 'Purpose', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], mappingName:"purpose",selectedOptions: [] as string[] },
    { label: 'Scope', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], mappingName:"scope",selectedOptions: [] as string[] },
    { label: 'Series', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], mappingName:"series",selectedOptions: [] as string[] },
    { label: 'Type', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], mappingName:"type",selectedOptions: [] as string[] },
    { label: 'PERM/TEMP', isOpen: false, opt: ['Option 1', 'Option 2', 'Option 3'], mappingName:"",selectedOptions: [] as string[] }
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
         this.p=1;
       this.  constructPayload()
  }

  

  constructPayload(filterByFlag:any="",latest:any=undefined,searchStatus:boolean=false){


    const payload:any={
      "pageNo":this.p-1,
     
    }

var filteredDataFilters:any =[]
var tableFilters:any={}
if(this.selectedFilters){
const dataFilters={
"fir":this.selectedFilters.fir,
"airport":this.selectedFilters['airports'],
"airSpaceEnr":this.selectedFilters['airspace/enr'],
"facilityDownGrade":this.selectedFilters['facilitydowngrade'],
"airPortClosure":this.selectedFilters.closure.includes('Airport Closure'),
"airSpaceClosure":this.selectedFilters.closure.includes('Enroute Clouser')
}



filteredDataFilters  = Object.fromEntries(
Object.entries(dataFilters).filter(([key, value]) => {
    return !Array.isArray(value) || value.length > 0;
})
);

if(filterByFlag==="warning"){
  delete filteredDataFilters['facilityDownGrade']
  delete filteredDataFilters['airPortClosure']
  delete filteredDataFilters['airSpaceClosure']
}
payload['dataFilters']=filteredDataFilters;
}

// if(latest){
//   tableFilters['category']=filterByFlag
// }


if(filterByFlag!==""){
 tableFilters['category']=filterByFlag
}
if(latest!==undefined){
  tableFilters['latest']=latest
}
if(searchStatus)
{
  tableFilters['searchTerm']=this.searchText;
}

this.headers.forEach((header:any)=>{
if(header.selectedOptions.length>0) {
tableFilters[header.mappingName]=header.selectedOptions
} 
})
payload['tableFilters']=tableFilters;
this.getTableData(payload)
  }

  onSearchClick(){
    this.p=1;
   this.constructPayload("",undefined,true)
  } 
  
  showPopup(noteNum:any,flag:any,entry:any){
    console.log(entry)
    this.notemanNumber = noteNum;
    this.flag = flag;
    this.isShowPopup = true;
    this.selectedNotam=entry;
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
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7",flagColor)
    this.constructPayload(flagColor)
    // this.filteredNotamData = this.notamData.filter((item:any) => item.flag === flagColor);
    // console.log(this.headers,"sdjbmsdb dsh dnb dh fnb he ned jhdb dn jhshdssjhsbksjhd")
  }

  onLatestClick(){
    this.p=1;
     this.constructPayload("",!this.latest)
     this.latest=!this.latest
  }

  pageChangeEvent(event: number){
    this.p=event;
  }


  onPageChnage($event:any){

   this.p=$event;
  
this.constructPayload()
  }

 

}
