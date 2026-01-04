import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';
import { Applicants } from '../../../shared/interfaces/data';
import { InterviewDetailModalComponent } from '../interview-detail-modal/interview-detail-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interview-calendar',
  standalone: true,
  imports: [CommonModule , InterviewDetailModalComponent],
  templateUrl: './interview-calendar.component.html',
  styleUrls: ['./interview-calendar.component.css']
})
export class InterviewCalendarComponent implements OnInit {

  currentStart!: Date;
  currentEnd!: Date;
agendaDays: any[] = [];
  agenda: any[] = [];
  itemsData: Applicants[] = [];
  showDetailModal = false;
selectedInterview: any = null;
constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef , private dataApplicants: DataService) {

    
  }
  ngOnInit() {
    this.setThisWeek();
    // this.loadAgenda();
    this.getDatainterview();
  }

  /* ===== ตั้งช่วงสัปดาห์ปัจจุบัน ===== */
  setThisWeek() {
    const today = new Date();
    const day = today.getDay() || 7;

    this.currentStart = new Date(today);
    this.currentStart.setDate(today.getDate() - day + 1);

    this.currentEnd = new Date(this.currentStart);
    this.currentEnd.setDate(this.currentStart.getDate() + 6);
  }

  prevWeek() {
    this.currentStart.setDate(this.currentStart.getDate() - 7);
    this.currentEnd.setDate(this.currentEnd.getDate() - 7);
    // this.loadAgenda();
        this.getDatainterview();

  }

  nextWeek() {
    this.currentStart.setDate(this.currentStart.getDate() + 7);
    this.currentEnd.setDate(this.currentEnd.getDate() + 7);
    // this.loadAgenda();
        this.getDatainterview();

  }


  /* ===== จัดกลุ่มตามวัน ===== */
 buildAgenda(data: any[]) {
  const map = new Map<string, any[]>();

  data.forEach(item => {
    const dateKey = item.interview_date;

    if (!map.has(dateKey)) {
      map.set(dateKey, []);
    }

    map.get(dateKey)!.push({
      time: item.interview_time,
      first_name: item.first_name,
      last_name: item.last_name,
      position: item.position_applied,
      department: item.department
    });
  });

  this.agendaDays = Array.from(map.entries()).map(([date, items]) => ({
    date,
    items
  }));
}
onDateChange(event: any) {
  const selected = new Date(event.target.value);
  if (isNaN(selected.getTime())) return;

  const day = selected.getDay() || 7;

  this.currentStart = new Date(selected);
  this.currentStart.setDate(selected.getDate() - day + 1);

  this.currentEnd = new Date(this.currentStart);
  this.currentEnd.setDate(this.currentStart.getDate() + 6);

  // this.loadAgenda();
      this.getDatainterview();

}


goToday() {
  const today = new Date();
  const day = today.getDay() || 7;

  this.currentStart = new Date(today);
  this.currentStart.setDate(today.getDate() - day + 1);

  this.currentEnd = new Date(this.currentStart);
  this.currentEnd.setDate(this.currentStart.getDate() + 6);

  // this.loadAgenda();
}


async getDatainterview() {
  const data = await this.dataApplicants.GetInerview();
  if (data.status === 200) {
    this.itemsData = data.msg;
    console.log('Interview Data:', this.itemsData);
     this.buildAgenda(this.itemsData);

  }
}

openDetail(interview: any) {
  this.selectedInterview = interview;
  this.showDetailModal = true;
}

async onUpdateStatus(e: {id:number,status:string}) {
  console.log('Update status', e);
 Swal.fire({
    title: 'กำลังบันทึกข้อมูล...',
    text: 'กรุณารอซักครู่',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  // 👉 เรียก API update สถานะตรงนี้
   const data = await this.dataApplicants.UpdateInterview(e.id, e.status === 'ผ่าน' ? 1 : 2);
  if (data.status === 200) {
    this.showDetailModal = false;
  await Swal.fire({
          icon: 'success',
          title: 'บันทึกสำเร็จ 🎉',
          text: 'ข้อมูลถูกบันทึกลงระบบแล้ว',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#3b82f6',
        });


  window.location.reload();
}


}
}  