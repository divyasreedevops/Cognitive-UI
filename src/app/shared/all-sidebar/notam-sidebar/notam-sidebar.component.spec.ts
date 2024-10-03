import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotamSidebarComponent } from './notam-sidebar.component';

describe('NotamSidebarComponent', () => {
  let component: NotamSidebarComponent;
  let fixture: ComponentFixture<NotamSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotamSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotamSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
