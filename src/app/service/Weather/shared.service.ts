import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private enrouteSidebar = new Subject<any>();
  enrouteSidebar$ = this.enrouteSidebar.asObservable();

  updateEnrouteSidebar(content: any) {
    this.enrouteSidebar.next(content);
  }

  private atsSidebar = new Subject<any>();
  atsSidebar$ = this.atsSidebar.asObservable();

  updateatsSidebar(content: any) {
    this.atsSidebar.next(content);
  }

  private resetmap = new Subject<any>();
  resetmap$ = this.resetmap.asObservable();

  updatemap(content: any) {
    this.resetmap.next(content);
  }

}
