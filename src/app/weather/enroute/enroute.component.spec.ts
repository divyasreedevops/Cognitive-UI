import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrouteComponent } from './enroute.component';

describe('EnrouteComponent', () => {
  let component: EnrouteComponent;
  let fixture: ComponentFixture<EnrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
