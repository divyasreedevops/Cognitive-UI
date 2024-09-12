import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PansOpsComponent } from './pans-ops.component';

describe('PansOpsComponent', () => {
  let component: PansOpsComponent;
  let fixture: ComponentFixture<PansOpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PansOpsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PansOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
