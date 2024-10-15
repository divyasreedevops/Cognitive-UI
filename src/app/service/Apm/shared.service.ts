import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private filterData = new Subject<any>();
  filterData$ = this.filterData.asObservable();

  updateFilter(content: any) {
    this.filterData.next(content);
  }
  private addMoreData = new Subject<any>();
  addMoreData$ = this.addMoreData.asObservable();

  updateaddMoreData(content: any) {
    this.addMoreData.next(content);
  }
}
