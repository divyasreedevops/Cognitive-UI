import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnroteSidebarComponent } from './enrote-sidebar.component';

describe('EnroteSidebarComponent', () => {
  let component: EnroteSidebarComponent;
  let fixture: ComponentFixture<EnroteSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnroteSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnroteSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
