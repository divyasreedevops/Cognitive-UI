import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
}
