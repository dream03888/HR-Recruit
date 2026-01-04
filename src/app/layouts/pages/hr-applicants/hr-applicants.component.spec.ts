import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrApplicantsComponent } from './hr-applicants.component';

describe('HrApplicantsComponent', () => {
  let component: HrApplicantsComponent;
  let fixture: ComponentFixture<HrApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrApplicantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
