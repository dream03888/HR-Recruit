// src/app/employment-form/form.model.ts
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function buildEmploymentForm(fb: FormBuilder): FormGroup {
  return fb.group({
    // ===== JOB =====
    positionApplied1: [''],
    positionApplied2: [''],
    positionApplied3: [''],
    employeeType: fb.group({
      fullTime: [false],
      partTime: [false],
      daily: [false],
    }),
    mobile: [''],
    availableDate: [''],
    expectedSalary: [''],

    // ===== PERSONAL =====
    title: [''], // นาย/นาง/นางสาว
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    nickname: [''],

    sex: [''], // male/female
    birthDate: [''],
    age: [''],
    placeOfBirth: [''],

    heightCm: [''],
    weightKg: [''],
    race: [''],
    nationality: [''],
    religion: [''],

    idCardNo: [''],

    license: fb.group({
      car: [false],
      motorcycle: [false],
    }),

    presentAddress: [''],

    residence: fb.group({
      ownHome: [false],
      parentsHome: [false],
      boardingHouse: [false],
      rentedHouse: [false],
      other: [false],
      otherText: [''],
    }),

    email: [''],
    socialMedia: [''],

    military: fb.group({
      discharged: [false],
      notYetDrafted: [false],
      exempted: [false],
    }),

    // ===== PHOTO =====
    photoDataUrl: [''], // base64 data url
  });
}
