import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-layouts',
  imports: [RouterOutlet , CommonModule , NavbarComponent],
  standalone: true,
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent {
 showNavbar = true;

   constructor(private router:   Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // ❌ ซ่อน navbar เมื่ออยู่หน้า login
        this.showNavbar = !event.urlAfterRedirects.includes('/login');
      }
    });
  }

}
