import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Baseurl } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class NotamService {
  private apiUrl =Baseurl;
  constructor(private http: HttpClient,private sharedService: SharedService) { }
}
