import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 
  constructor() { }


  private formValuesSubject = new BehaviorSubject<any>(null);
  formValues$ = this.formValuesSubject.asObservable();

  updateFormValues(values: any) {
    this.formValuesSubject.next(values);
  }

  private notamDataSubject = new BehaviorSubject<any>(null);
  notamData$ = this.notamDataSubject.asObservable();

  notamDataList(values: any) {
    this.notamDataSubject.next(values);
  }

}
