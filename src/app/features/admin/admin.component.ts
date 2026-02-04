import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { TenantService } from '../../core/services/tentant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
currentTenant: any = null;
  lastUpdated = new Date();
  
  mockUsers = [
    { username: 'admin1', role: 'admin' },
    { username: 'user1', role: 'user' },
    { username: 'user2', role: 'user' },
    { username: 'user3', role: 'user' }
  ];
  
  auditLog = [
    { timestamp: new Date('2024-01-15T10:30:00'), action: 'User login', user: 'admin1' },
    { timestamp: new Date('2024-01-15T10:15:00'), action: 'Settings updated', user: 'admin1' },
    { timestamp: new Date('2024-01-15T09:45:00'), action: 'New user created', user: 'admin1' },
    { timestamp: new Date('2024-01-15T09:30:00'), action: 'Report generated', user: 'user1' },
    { timestamp: new Date('2024-01-15T09:00:00'), action: 'System backup', user: 'admin1' }
  ];
  
  constructor(
    private tenantService: TenantService
  ) {}
  
  ngOnInit(): void {
    this.tenantService.currentTenant$.subscribe(tenant => {
      this.currentTenant = tenant;
    });
  }
}
