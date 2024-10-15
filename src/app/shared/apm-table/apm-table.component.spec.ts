import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmTableComponent } from './apm-table.component';

describe('ApmTableComponent', () => {
  let component: ApmTableComponent;
  let fixture: ComponentFixture<ApmTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApmTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
