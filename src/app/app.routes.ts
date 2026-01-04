import { Routes } from '@angular/router';

export const routes: Routes = [
  // 🏠 MAIN APP (มี layout + navbar)
  {
    path: '',
    loadComponent: () =>
      import('./layouts/layouts.component').then((m) => m.LayoutsComponent),
    children: [
      // ✅ หน้าแรก → setting
      {
        path: '',
        redirectTo: 'apply-job',
        pathMatch: 'full',
      },

      {
        path: 'setting',
        loadComponent: () =>
          import('./layouts/pages/setting/setting.component').then(
            (m) => m.SettingsComponent
          ),
      },

      {
        path: 'apply-job',
        loadComponent: () =>
          import('./layouts/pages/apply-job/apply-job.component').then(
            (m) => m.ApplyJobComponent
          ),
      },

      
      {
        path: 'hr-job',
        loadComponent: () =>
          import('./layouts/pages/hr-applicants/hr-applicants.component').then(
            (m) => m.HrApplicantsComponent
          ),
      },
      {
        path: 'carlendar',
        loadComponent: () =>
          import('./layouts/pages/interview-calendar/interview-calendar.component').then(
            (m) => m.InterviewCalendarComponent
          ),
      },

      

    ],
  },

  // ❗ fallback
  {
    path: '**',
    redirectTo: '',
  },
];
