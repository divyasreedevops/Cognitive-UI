import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSidebarComponent } from './weather-sidebar.component';

describe('WeatherSidebarComponent', () => {
  let component: WeatherSidebarComponent;
  let fixture: ComponentFixture<WeatherSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
