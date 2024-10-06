import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Baseurl, Notam } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class NotamService {
  private apiUrl =Baseurl;
  constructor(private http: HttpClient,private sharedService: SharedService) {

   }

   getNotamFilterOptions(){
    return  this.http.get<any>(`${this.apiUrl}${Notam.notamFilter}`);
   }

   getNotamList(data:any){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.apiUrl}${Notam.notamList}`,data,{headers});
   }


}
