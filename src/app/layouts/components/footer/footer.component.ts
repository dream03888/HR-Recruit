import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  company = 'DMS Isolutions PTE. (Thailand) Co., Ltd.';
  appName = 'Drug Management System';
  appVersion = '2.0.0';
}
