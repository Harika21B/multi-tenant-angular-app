import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TenantService } from '../../services/tentant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tenant-selector.component.html',
  styleUrl: './tenant-selector.component.css'
})
export class TenantSelectorComponent {
  private tenantService = inject(TenantService);
  private router = inject(Router);

  showSelector = true;

  selectTenant(tenantId: string): void {
    localStorage.setItem('dev_tenant', tenantId);

    // Reload the page with the selected tenant
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('tenant', tenantId);
    window.location.href = currentUrl.toString();
  }
}
