import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Baseurl,Adm} from "../../../utils/constants";
import { SharedService } from '../../shared.service';
@Injectable({
  providedIn: 'root'
})
export class PansopsService {

  private apiUrl =Baseurl; // Replace with your API endpoint
  private selectedAirac="";
  private airacValues=[];
  constructor(private http: HttpClient,private sharedService: SharedService) {
     
    this.sharedService.sidebar$.subscribe(sidebarRes => {
      this.selectedAirac = sidebarRes;
    });

    this.sharedService.airac$.subscribe(airacRes=>{
      this.airacValues=airacRes;
    })
   
  }
   getAiracId(){
    const _selectValue:any=this.airacValues.find((ele:any)=>ele.status==="active")
    return  this.selectedAirac==='compare'?_selectValue?.id:this.selectedAirac;
   }
  
  getAirports(): Observable<any> {
    
    return this.http.get<any>(`${this.apiUrl}${Adm.airport}/${this.getAiracId()}`);
  }

  getRunways(airportId:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${Adm.runways}/${this.getAiracId()}/${airportId}`);
  }

  getProcedureTypes(airportId:string,runwayId:string){
    return this.http.get<any>(`${this.apiUrl}${Adm.type}/${this.getAiracId()}/${airportId}/${runwayId}`);
  }

  getProcedureNames(airportId:string,typeOfProcedure:string,procedureName:string,data:any):Observable<any>{
    data.airac_id=this.getAiracId();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.apiUrl}/adm/procedures`,data,{headers});
  }

  getProcedure(data:any):Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.apiUrl}/adm/procedure_data`,data,{headers});
  }

  getAiracInfo():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}${Adm.airac}`);
  }


  getProcedureCompareDetails(data:any):Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.apiUrl}/adm/compare`,data,{headers});
  }

  // // Example POST request
  // postData(data: any): Observable<any> {
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this.http.post<any>(`${this.apiUrl}/data`, data, { headers });
  // }

  // // Example PUT request
  // updateData(id: string, data: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/data/${id}`, data);
  // }

  // // Example DELETE request
  // deleteData(id: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/data/${id}`);
  // }
}
