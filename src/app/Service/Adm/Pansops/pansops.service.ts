import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PansopsService {

  private apiUrl = 'https://api.example.com'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  
  getAirports(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/airports`);
  }

  // Example POST request
  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.apiUrl}/data`, data, { headers });
  }

  // Example PUT request
  updateData(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/data/${id}`, data);
  }

  // Example DELETE request
  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/data/${id}`);
  }
}
