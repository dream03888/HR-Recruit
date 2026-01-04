import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { DrugService } from '../../../shared/services/drug.service';
// import { LocalStorageService } from '../../../shared/services/local-storage.service';
// import { userLogin } from '../../../shared/interfaces/drug.interface';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

export interface Menu {
  title: string;
  url: string;
  icon: string;
  submenus?: Menu[];
}


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    private readonly router: Router = inject(Router)
    // loggedInUser!: userLogin;
  
  
  constructor(private fb: FormBuilder, private storageSrv: LocalStorageService) {



  }
  

  ngOnInit() { 
  }


  logout() {
  Swal.fire({
    title: 'ออกจากระบบ?',
    text: 'คุณต้องการออกจากระบบหรือไม่',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ออกจากระบบ',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  });
  }
}