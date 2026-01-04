import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.css',
})
export class ApplyJobComponent {
  get trainingsFA(): FormArray {
    return this.form.get('trainings') as FormArray;
  }

  get workExperiencesFA(): FormArray {
    return this.form.get('workExperiences') as FormArray;
  }
  form: FormGroup;
  mode: 'edit' | 'print' = 'edit';

  step = 1;
  totalStep = 4;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      position1: [''],
      position2: [''],
      position3: [''],
      mobile: [''],
      startDate: [''],
      salary: [''],

      firstName: [''],
      lastName: [''],
      nickname: [''],
      sex: [''],
      birthDate: [''],
      age: [''],
      birthPlace: [''],

      height: [''],
      weight: [''],
      race: [''],
      nationality: [''],
      religion: [''],

      idCard: [''],
      address: [''],
      email: [''],
      social: [''],
      militaryStatus: [''],

      maritalStatus: [''],
      siblings: [''],
      childOrder: [''],
      childrenCount: [''],
      fatherPhone: [''],

      motherName: [''],
      motherAge: [''],
      motherJob: [''],
      motherWork: [''],
      motherPhone: [''],

      spouseName: [''],
      spouseAge: [''],
      spouseJob: [''],
      spouseWork: [''],
      spousePhone: [''],

      eduPrimarySchool: [''],
      eduPrimaryMajor: [''],
      eduPrimaryGpa: [''],
      eduPrimaryFrom: [''],
      eduPrimaryTo: [''],

      eduSecondarySchool: [''],
      eduSecondaryMajor: [''],
      eduSecondaryGpa: [''],
      eduSecondaryFrom: [''],
      eduSecondaryTo: [''],

      eduHighSchool: [''],
      eduHighMajor: [''],
      eduHighGpa: [''],
      eduHighFrom: [''],
      eduHighTo: [''],

      eduVocSchool: [''],
      eduVocMajor: [''],
      eduVocGpa: [''],
      eduVocFrom: [''],
      eduVocTo: [''],

      eduDipSchool: [''],
      eduDipMajor: [''],
      eduDipGpa: [''],
      eduDipFrom: [''],
      eduDipTo: [''],

      eduBachelorSchool: [''],
      eduBachelorMajor: [''],
      eduBachelorGpa: [''],
      eduBachelorFrom: [''],
      eduBachelorTo: [''],

      eduMasterMajor: [''],
      eduMasterSchool: [''],
      eduMasterGpa: [''],
      eduMasterFrom: [''],
      eduMasterTo: [''],

      eduOtherSchool: [''],
      eduOtherMajor: [''],
      eduOtherGpa: [''],
      eduOtherFrom: [''],
      eduOtherTo: [''],

      emergencyRelation: [''],
      emergencyName: [''],
      emergencyPhone: [''],

      fatherName: [''],
      fatherAge: [''],
      fatherJob: [''],
      fatherWork: [''],
      photo: [''],

      trainings: this.fb.array([
        this.fb.group({
          year: [''],
          organization: [''],
          course: [''],
          duration: [''],
        }),
      ]),
      workExperiences: this.fb.array([
        this.fb.group({
          company: [''],
          position: [''],
          from: [''],
          to: [''],
          description: [''],
          lastSalary: [''],
          reason: [''],
        }),
      ]),
      // ✅ ตรงนี้คือหัวใจของ error
  languages: this.fb.group({
    thai: this.fb.group({
      speak: [''],
      read: [''],
      write: ['']
    }),
    english: this.fb.group({
      speak: [''],
      read: [''],
      write: ['']
    }),
    chinese: this.fb.group({
      speak: [''],
      read: [''],
      write: ['']
    })
  }),

  computerSkills: this.fb.group({
    word: [''],
    excel: [''],
    powerpoint: ['']
  }),

  otherSkills: [''],
      skills: [''],
      references: [''],


      travel_car: [''],
      travel_motorcycle: [''],
      travel_bus: [''],
      travel_bicycle: [''],

      source_ad: [''],
      source_friend: [''],
      source_website: [''],
      source_other: [''],

      know_employee: [''],

      known_emp_name: [''],
      known_emp_department: [''],
      known_emp_relation: [''],
      worked_before: [''],

      prev_position: [''],
      prev_department: [''],
      prev_year: [''],

      dismissed: [''],
      chronic_disease: [''],
      chronic_detail: [''],
      convicted: [''],
      currently_working: [''],
      start_time: [''],
      start_date_detail: [''],
      travel_other: [''],
      source_direct: [''],
    });
  }

  /* ===============================
     ⭐ หัวใจของระบบ (ไม่แตะ HTML)
     =============================== */
  @HostBinding('attr.data-step')
  get dataStep() {
    return this.step;
  }
  @HostBinding('attr.data-dir')
  dir: 'next' | 'prev' = 'next';

  next() {
    if (this.step < this.totalStep) {
      this.dir = 'next'; // ⭐ บอกว่ากำลังไปข้างหน้า
      this.step++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prev() {
    if (this.step > 1) {
      this.dir = 'prev'; // ⭐ บอกว่ากำลังย้อนกลับ
      this.step--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  print() {
    this.mode = 'print';
    setTimeout(() => window.print(), 100);
  }

  uploadPhoto(ev: Event) {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.form.patchValue({ photo: reader.result });
    reader.readAsDataURL(file);
  }
}
