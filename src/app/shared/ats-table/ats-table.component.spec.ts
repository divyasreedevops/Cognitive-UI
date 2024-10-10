import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsTableComponent } from './ats-table.component';

describe('AtsTableComponent', () => {
  let component: AtsTableComponent;
  let fixture: ComponentFixture<AtsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
