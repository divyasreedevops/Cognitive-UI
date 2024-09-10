import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WxmComponent } from './wxm.component';

describe('WxmComponent', () => {
  let component: WxmComponent;
  let fixture: ComponentFixture<WxmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WxmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WxmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
