import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interview-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview-detail-modal.component.html',
  styleUrls: ['./interview-detail-modal.component.css']
})
export class InterviewDetailModalComponent {

  @Input() interview: any;
  @Output() close = new EventEmitter<void>();
  @Output() updateStatus = new EventEmitter<{id:number,status:string}>();

ngOninit() {
  console.log(this.interview);
}



  pass() {
    this.updateStatus.emit({ id: this.interview.id, status: 'ผ่าน' });
  }

  fail() {
    this.updateStatus.emit({ id: this.interview.id, status: 'ไม่ผ่าน' });
  }
}
