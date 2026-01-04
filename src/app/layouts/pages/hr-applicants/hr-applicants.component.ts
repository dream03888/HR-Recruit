import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';
import { Applicants } from '../../../shared/interfaces/data';
import { InterviewModalComponent } from '../interview-modal/interview-modal.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-hr-applicants',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InterviewModalComponent,
  ],
  templateUrl: './hr-applicants.component.html',
  styleUrls: ['./hr-applicants.component.css'], // 👈 แก้เป็น styleUrls (มี s)
})
export class HrApplicantsComponent implements OnInit {
  @ViewChild('applicantDetailModal')
  applicantDetailModal!: ElementRef<HTMLDialogElement>;
  pages: number[] = [];
  totalPages = 0;

  filterForm!: FormGroup;
  applicants: Applicants[] = [];
  filteredApplicants: Applicants[] = [];
  currentPage = 1;
  limit = 10;
  selectedApplicant: any = {};
  showDrawer = false;
  showInterviewModal = false;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dataApplicants: DataService
  ) {}

  ngOnInit() {
    this.GetUserApplicants(1);
    this.filterForm = this.fb.group({
      keyword: [''],
      status: [''],
    });

  this.filterForm.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(() => this.applyFilter());  }

applyFilter() {
  const { keyword, status } = this.filterForm.value;
  const kw = keyword?.toLowerCase().trim();

  this.filteredApplicants = this.applicants.filter(a => {
    const fullname = `${a.first_name} ${a.last_name}`.toLowerCase();
    const cid = a.national_id?.toLowerCase();

    const matchKeyword =
      !kw ||
      fullname.includes(kw) ||
      cid?.includes(kw);

    const matchStatus =
      !status || a.interview_status === status;

    return matchKeyword && matchStatus;
  });
}


  toggleAll(event: any) {
    this.applicants.forEach((a) => (a.selected = event.target.checked));
  }

  updateStatus(newStatus: 'ผ่าน' | 'ไม่ผ่าน') {
    const selected = this.applicants.filter((a) => a.selected);
    selected.forEach((a) => {
      a.interview_status = newStatus;
      a.selected = false;
      // 🔹 TODO: call API update status
    });
  }

  openDrawer(applicant: any) {
    this.selectedApplicant = applicant;
    this.showDrawer = true;
  }

  closeDrawer() {
    this.showDrawer = false;
    this.selectedApplicant = null;
  }

 async GetUserApplicants(page: number = 1) {
  this.currentPage = page;

  const data = await this.dataApplicants.getApplicants(
    this.currentPage,
    this.limit
  );

  if (data.status === 200) {
    // 1️⃣ source
    this.applicants = data.msg;

    // 2️⃣ ตรวจเลขบัตรซ้ำ
    const cidCount: Record<string, number> = {};

    this.applicants.forEach(a => {
      if (a.national_id) {
        cidCount[a.national_id] = (cidCount[a.national_id] || 0) + 1;
      }
    });

    // 3️⃣ ใส่ flag isDuplicate
  this.applicants = this.applicants.map(a => ({
  ...a,
    isDuplicate: cidCount[a.national_id] > 1
}));


    // 4️⃣ view
    this.filteredApplicants = [...this.applicants];

    this.totalPages = data.totalPages ?? 0;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}


  openInterviewModal() {
    if (!this.selectedApplicant) return;
    this.showInterviewModal = true;
  }

  saveInterview(data: any) {
    console.log('Interview data:', data);

    this.showInterviewModal = false;
  }

  exportExcel() {
    const data = this.applicants.map((a) => ({
      ชื่อ: `${a.first_name} ${a.last_name}`,
      CID: a.national_id,
      โทร: a.phone,
      วันเดือนปีเกิด: a.birth_date,
      อายุ: a.age,
      เงินเดือนที่คาดหวัง: a.expected_salary,
      ระดับการศึกษา: a.education_level,
      สถานะ: a.interview_status,
      ตำแหน่ง: a.position_applied,
      ฝ่าย: a.department,
      วันที่สมัคร: a.apply_date,
      ภาษาที่ถนัด: a.language_skills,
      เคยสมัครงานก่อนหรือไม่: a.applied_before ? 'เคย' : 'ไม่เคย',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
      Sheets: { Applicants: worksheet },
      SheetNames: ['Applicants'],
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(
      blob,
      `job_applicants_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  }
  async Import(event: Event) {
    console.log('Importing applicants from Excel...', event);
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // ทำงานต่อได้เลย
    console.log('Selected file:', file.name);
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json<any>(sheet);

      const applicants = rows.map((row) => ({
        apply_date: this.parseDate(row['apply_date']),
        position_applied: row['position_applied'],
        department: row['department'],
        company: row['company'],
        title: row['title'],
        first_name: row['first_name'],
        last_name: row['last_name'],
        phone: row['phone'],
        national_id: String(row['national_id']),
        interview_status: this.mapStatus(row['interview_status']),
        expected_salary: Number(row['expected_salary']),
        education_level: row['education_level'],
        birth_date: this.parseDate(row['birth_date']),
        age: Number(row['age']),
        previous_company: row['previous_company'],
        language_skills: row['language_skills'],
        applied_before: row['applied_before'] === 'เคย' ? 1 : 0,
        blacklist: row['blacklist'] ? 1 : 0,
        distance_km: Number(row['distance_km']),
        start_work_within_6_days:
          row['start_work_within_6_days'] === 'ใช่' ? 1 : 0,
        note: row['note'],
      }));

      console.log('Import Applicants:', applicants);

      // 👉 ส่งเข้า backend
      const items = this.dataApplicants.InsetJobApplcants(applicants);
      if ((await items).status == 200) {
        Swal.fire({
          icon: 'success',
          title: 'นำเข้าข้อมูลสำเร็จ 🎉',
        });
        console.log('Insert response:', (await items).status);
        await this.GetUserApplicants(1);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'นำเข้าข้อมูลไม่สำเร็จ ❌',
        });
      }
    };

    reader.readAsArrayBuffer(file);
  }
  mapStatus(status: string): number {
    switch (status) {
      case 'ผ่าน':
        return 1;
      case 'ไม่ผ่าน':
        return 2;
      case 'รอพิจารณา':
        return 0;
      default:
        return 0;
    }
  }
 parseDate(value: any): string | null {
  if (!value) return null;

  // 1️⃣ กรณีเป็น Date object
  if (value instanceof Date) {
    return this.formatDate(value);
  }

  // 2️⃣ กรณี Excel ส่งมาเป็น number (serial date)
  if (typeof value === 'number') {
    const excelEpoch = new Date(1899, 11, 30);
    const date = new Date(excelEpoch.getTime() + value * 86400000);
    return this.formatDate(date);
  }

  // 3️⃣ กรณีเป็น string
  if (typeof value === 'string') {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return this.formatDate(date);
    }
  }

  return null;
}

private formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}


async onUpdateStatus(id: number) {

  const confirm = await Swal.fire({
    icon: 'warning',
    title: 'ยืนยันการปฏิเสธ',
    text: 'คุณต้องการปฏิเสธผู้สมัครรายนี้ใช่หรือไม่ ?',
    showCancelButton: true,
    confirmButtonText: 'ใช่, ปฏิเสธ',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#ef4444', // แดง
    cancelButtonColor: '#6b7280',  // เทา
    reverseButtons: true
  });

  // ❌ ถ้ากด Cancel
  if (!confirm.isConfirmed) {
    return;
  }

  // ✅ ถ้ากด OK
  Swal.fire({
    title: 'กำลังบันทึกข้อมูล...',
    text: 'กรุณารอสักครู่',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // 👉 เรียก API
  const data = await this.dataApplicants.UpdateInterview(id, 5);

  if (data.status === 200) {
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
