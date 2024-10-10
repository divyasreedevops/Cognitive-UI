import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 
  constructor() { }

  private showCirclesSource = new Subject<any>();

  // Observable to subscribe to
  showCircles$ = this.showCirclesSource.asObservable();

  // Method to emit circle data
  emitCircleData(circleData: any): void {
    this.showCirclesSource.next(circleData);
  }


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

  private atsSubject = new BehaviorSubject<any>(null);
  atsData$ = this.atsSubject.asObservable();

  atsDataList(values: any) {
    this.atsSubject.next(values);
  }

}
