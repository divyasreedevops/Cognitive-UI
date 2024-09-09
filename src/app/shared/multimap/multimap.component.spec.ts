import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimapComponent } from './multimap.component';

describe('MultimapComponent', () => {
  let component: MultimapComponent;
  let fixture: ComponentFixture<MultimapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultimapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultimapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
