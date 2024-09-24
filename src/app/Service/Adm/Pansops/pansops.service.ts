import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PansopsService {

  private apiUrl = 'http://localhost:3000'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  
  getAirports(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/airports`);
  }

  getRunways(airportId:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/runways/${airportId}`);
  }

  getProcedureNames(airportId:string,typeOfProcedure:string,procedureName:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/procedures/${airportId}/${typeOfProcedure}/${procedureName}`);
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
