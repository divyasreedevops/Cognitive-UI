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
}
