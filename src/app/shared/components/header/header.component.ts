import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { TenantService } from '../../../core/services/tentant.service';
import { TenantConfig, User } from '../../../models/tentant.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() layout: 'side' | 'top' = 'side';
  private authService = inject(AuthService);
  private tenantService = inject(TenantService);
  
  tenant: TenantConfig | null = null;
  currentUser: User | null = null;
  
  ngOnInit(): void {
    this.tenantService.currentTenant$.subscribe(tenant => {
      console.log("tentant", tenant)
      this.tenant = tenant;
    });
    
    this.currentUser = this.authService.getCurrentUser();
  }
  
  logout(): void {
    this.authService.logout();
  }
}