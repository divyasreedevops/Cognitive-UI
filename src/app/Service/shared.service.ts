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

  private updateSidebar = new Subject<any>();
  sidebar$ = this.updateSidebar.asObservable();

  updateSideBar(content: any) {
    this.updateSidebar.next(content);
  }


  private airportSubject = new BehaviorSubject<any>(null);
  private runwaySubject = new BehaviorSubject<any>(null);
  private procedureSubject = new BehaviorSubject<any>(null);
  private AiracSubject = new BehaviorSubject<any>(null);
  private CompareAiracSubject = new BehaviorSubject<any>(null);




  airport$ = this.airportSubject.asObservable();
  runway$ = this.runwaySubject.asObservable();
  procedure$ = this.procedureSubject.asObservable();
  airac$=this.AiracSubject.asObservable();
  compareAirac$=this.CompareAiracSubject.asObservable();


  setAirportData(data: any) {
    this.airportSubject.next(data);
  }
  setRunwayData(data: any) {
    this.runwaySubject.next(data);
  }
  setProcedureData(data: any) {
    this.procedureSubject.next(data);
  }

  setAiracInfo(data:any){
    this.AiracSubject.next(data);
  }

  setCompareAiracInfo(data:any){
    this.CompareAiracSubject.next(data);
  }

  private loader = new Subject<any>();
  loader$ = this.loader.asObservable();

  updateloader(content: any) {
    this.loader.next(content);
  }
}
