import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotamTableComponent } from './notam-table.component';

describe('NotamTableComponent', () => {
  let component: NotamTableComponent;
  let fixture: ComponentFixture<NotamTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotamTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotamTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
