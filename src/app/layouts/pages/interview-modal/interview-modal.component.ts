import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interview-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './interview-modal.component.html',
  styleUrls: ['./interview-modal.component.css']
})
export class InterviewModalComponent {
  form!: FormGroup;

  @Input() applicant!: any;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  

constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef , private dataApplicants: DataService) {

    
  }
     ngOnInit() {
   this.form = this.fb.group({
    applicant_id: [this.applicant.id],
    date: [''],
    time: [''],
    location: [''],
    note: ['']

  });
     }
  // submit() {
  //   this.save.emit({
  //     applicant_id: this.applicant.id,
  //     interview_date: this.form.value.date,
  //     interview_time: this.form.value.time,
  //     location: this.form.value.location,
  //     note: this.form.value.note
  //   });
  // }


async submit() {
 // แสดง loading
     if (!this.applicant) return;

  Swal.fire({
    title: 'กำลังบันทึกข้อมูล...',
    text: 'กรุณารอซักครู่',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  const data = await this.dataApplicants.InsetInterview(this.form.value);
  if (data.status === 200) {
     Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ 🎉',
        text: 'ข้อมูลถูกบันทึกลงระบบแล้ว',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#3b82f6',
      });

      // ถ้าอยากเคลียร์ฟอร์มให้เพิ่มตรงนี้
      this.close.emit();
        this.form.reset();
      return;
  }
}


}
