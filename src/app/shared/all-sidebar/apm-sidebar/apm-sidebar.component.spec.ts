import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmSidebarComponent } from './apm-sidebar.component';

describe('ApmSidebarComponent', () => {
  let component: ApmSidebarComponent;
  let fixture: ComponentFixture<ApmSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApmSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApmSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
