import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NotamService } from 'src/app/service/Notam/notam.service';
import { SharedService } from 'src/app/service/Notam/shared.service';
import {SharedService as CommonSharedService}  from 'src/app/service/shared.service';
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
  filtersData:any;
  @Output() showCircles: EventEmitter<any> = new EventEmitter<any>();
  p: number = 1;
  total: number =0;
  constructor(private notamservice: NotamService,private sharedService:SharedService, private mapService: SharedService, private commonSharedService:CommonSharedService){
  }

  searchText:string=""
  selectedFilters:any;
  latest:boolean=false;
  notamTableStatus:any=true;
  ngOnInit(): void {
    this.getTableData({
      "pageNo":this.p-1,
      "dataFilters":{
        "airPortClosure":false,
        "airSpaceClosure":false
       }
    });

    this.sharedService.notanTableStatus$.subscribe((data)=>{
    
      this.notamTableStatus=data
    })

    this.sharedService.sidebarFiltersSubject$.subscribe((data)=>{
      this.filtersData=data;
      console.log(this.filtersData,"ckjdvdfjvgdufvbdfjgvfyugvdfugv")
    })

    this.sharedService.formValues$.subscribe((data)=>{
      if(data){
        this.selectedFilters=data;
        if(this.notamTableStatus){
          this.p=1;
          this.constructPayload()
        }
        else{
          this.close()
        }
      }
    })

    this.sharedService.mapFiltersStatus$.subscribe((data)=>{
      if(data){
        this.close(data)
      }
    })
  }


  getNamesOfCodes(code:any,field:any){
    switch(field){
      case "qualifier1":{
        const data=this.filtersData[field].find((ele:any)=>ele.code===code);
     return data?data.significance:""
      }
      case "qualifier2":{
         const data=this.filtersData[field].find((ele:any)=>ele.code===code);
         return data?data.significance:""
      }
      case "scope":{
        const data=this.filtersData[field].find((ele:any)=>ele.code===code);
         return data?data.name:""
      }
      case "traffic":{
          const data=this.filtersData[field].find((ele:any)=>ele.code===code);
         return data?data.name:""
      }
      case "type":{
          const data=this.filtersData[field].find((ele:any)=>ele.code===code);
         return data?data.name:""
      }
      case "genInstruction":{
       const data=this.filtersData[field].find((ele:any)=>ele.code===code);
         return data?data.significance:""
      }
      case "purpose":{
        const data=this.filtersData[field].find((ele:any)=>ele.code===code);
          return data?data.name:""
       }

      default:
        return "sdjhe"
    }
  }


  getTableData(payload:any){
    this.commonSharedService.updateloader(true);
    this.notamservice.getNotamList(payload).subscribe((res:any)=>{
      this.commonSharedService.updateloader(false);
      this.notamData=res.data;
      this.filteredNotamData=[...this.notamData]
      this.total=res.totalCount;
        

   Object.keys( res.filterData).forEach((element:any)=>{
        const elementFound=  this.headers.find((ele)=>ele.mappingName===element);
        if(elementFound){
          elementFound.opt=res.filterData[element]
        }
      })
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
    this.notemanNumber = noteNum;
    this.flag = flag;
    this.isShowPopup = true;
    this.selectedNotam=entry;
  }

  close(filterByFlag:any=null) {
    this.isMinimize.emit({ status: 0 });
    var tableFilters:any={}
    let payload:any = {
      "pageNo": 0 // Start with the first page
    };

  
      if(this.selectedFilters){
        const dataFilters={
          "fir":this.selectedFilters.fir,
          "airport":this.selectedFilters['airports'],
          "airSpaceEnr":this.selectedFilters['airspace/enr'],
          "facilityDownGrade":this.selectedFilters['facilitydowngrade'],
          "airPortClosure":this.selectedFilters.closure.includes('Airport Closure'),
          "airSpaceClosure":this.selectedFilters.closure.includes('Enroute Clouser')
          }
          const filteredDataFilters  = Object.fromEntries(
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

      if(filterByFlag){
        tableFilters['category']=filterByFlag
       }
       payload['tableFilters']=tableFilters;
    // Recursive function to handle pagination and data accumulation
    const fetchNotamData = (payload: any) => {
      this.notamservice.getNotamList(payload).subscribe((res: any) => {
        let tempList = []
        for (let i = 0; i < res.data.length; i++) {
          if (Object.keys(res.data[i]).length !== 0){
            const obj:any = res.data[i];
              let temp = {
                "lat": obj.lat,
                "lon": obj.lon,
                "radius": obj.radius,
                "category": obj.category,
                "notam":obj.notam,
                "end_date": obj.end_date,
                "start_date": obj.start_date,
              };
              tempList.push(temp);
            }
        }
  
     
        // Emit the circle data after each page is processed
        console.log('tempList.length', tempList.length)
        this.mapService.emitCircleData([tempList, res.nextPage]);
  
        // Handle pagination, check if nextPage exists
        if (res.nextPage) {
          payload.pageNo = res.nextPage; // Update payload with the next page number
          // Fetch the next page of data
          fetchNotamData(payload);
        } else {
          this.commonSharedService.updateloader(false);
          // No more pages, finalize the process and emit the final data
          this.sharedService.notamDataList(res.data);
        }
      });
    };
    this.commonSharedService.updateloader(true);
    // Call the recursive function with the initial payload
    fetchNotamData(payload);

    this.notamservice.getAtsData({
      "points":"VABB-G208-ISRIS-DOSTO-APANO-G461-VAAH"
  }).subscribe((data:any)=>{
      this.sharedService.atsDataList(data)
  })

  }

  filterByFlag(flagColor: string) {
    this.constructPayload(flagColor)
    // this.filteredNotamData = this.notamData.filter((item:any) => item.flag === flagColor);
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
