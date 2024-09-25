
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Baseurl,Auth} from "../../utils/constants";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = Baseurl; 

  constructor(private http: HttpClient) {}
  login(data: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url=`${this.apiUrl}${Auth.login}`;
    return this.http.post<any>(url, data, { headers });
  }

  // // Example PUT request
  // updateData(id: string, data: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/data/${id}`, data);
  // }

  // // Example DELETE request
  // deleteData(id: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/data/${id}`);
  // }
}
