import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { TenantService } from './core/services/tentant.service';
import { ThemeService } from './core/services/theme.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { filter } from 'rxjs';
import { TenantSelectorComponent } from './core/components/tenant-selector/tenant-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, NavbarComponent, TenantSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 private authService = inject(AuthService);
  private tenantService = inject(TenantService);
  private themeService = inject(ThemeService);
  private router = inject(Router);

  isAuthenticated = false;
  layoutType: 'side' | 'top' = 'side';
  tenantLoaded = false;
  isLoginPage = false;

  ngOnInit(): void {
    // Check if current route is login
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoginPage = this.router.url.includes('/login');
    });

    // Initialize tenant configuration
    this.tenantService.loadTenantConfig().subscribe({
      next: (tenant) => {
        console.log('Tenant loaded successfully:', tenant);
        this.themeService.applyTheme(tenant);
        this.layoutType = tenant.layout;
        this.tenantLoaded = true;
      },
      error: (error) => {
        console.error('Failed to load tenant:', error);
        // Force a default tenant
        this.tenantLoaded = true;
      }
    });

    // Subscribe to authentication state
    this.isAuthenticated = this.authService.isAuthenticated();

    // Watch for authentication changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
    });

    // Get layout from tenant service
    this.tenantService.currentTenant$.subscribe(tenant => {
      if (tenant) {
        this.layoutType = tenant.layout;
        this.tenantLoaded = true;
      }
    });
  }
}
