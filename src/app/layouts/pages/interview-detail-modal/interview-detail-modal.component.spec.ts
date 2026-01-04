import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewDetailModalComponent } from './interview-detail-modal.component';

describe('InterviewDetailModalComponent', () => {
  let component: InterviewDetailModalComponent;
  let fixture: ComponentFixture<InterviewDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
