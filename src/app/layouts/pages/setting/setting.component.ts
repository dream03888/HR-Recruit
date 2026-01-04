import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './setting.component.html'
})
export class SettingsComponent implements OnInit {

  ports: { path: string; manufacturer?: string }[] = [];
  port = '';
  baudRate = 9600;
  status = '';

  async ngOnInit() {
    if (!window.api) {
      console.warn('Running in browser mode');
      return;
    }
    this.ports = await window.api.listComPorts();

  }

  async connect() {
    if (!window.api) return;

    if (!this.port) {
      this.status = 'กรุณาเลือก COM Port';
      return;
    }

    const res = await window.api.connectCom({
      path: this.port,
      baudRate: this.baudRate
    });

    this.status = res.success ? 'เชื่อมต่อแล้ว' : (res.message ?? 'error');
  }

  async test() {
    console.log("KUYYYYYYYYYY");
    if (!window.api) return;

    const res = await window.api.sendCom('TEST\r\n');
    this.status = res.success ? 'ส่งข้อมูลแล้ว' : (res.message ?? 'ส่งไม่สำเร็จ');
  }
}
