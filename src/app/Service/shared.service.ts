import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private sidebarContentSource = new Subject<any>();
  sidebarContent$ = this.sidebarContentSource.asObservable();

  updateSidebarContent(content: any) {
    this.sidebarContentSource.next(content);
  }

  private formValuesSubject = new BehaviorSubject<any>(null);
  formValues$ = this.formValuesSubject.asObservable();

  updateFormValues(values: any) {
    this.formValuesSubject.next(values);
  }

  private navbar = new Subject<any>();
  navbar$ = this.navbar.asObservable();

  updatenavbar(content: any) {
    this.navbar.next(content);
  }
}
