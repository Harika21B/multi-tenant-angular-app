import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { TenantService } from '../../core/services/tentant.service';
import { TenantConfig } from '../../models/tentant.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private tenantService = inject(TenantService);

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  tenant: TenantConfig | null = null;
  returnUrl = '/dashboard';
  tenantLoading = true;

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('LoginComponent initialized');

    console.log('Current URL:', window.location.href);
    console.log('URL Search Params:', window.location.search);

    const urlParams = new URLSearchParams(window.location.search);
    console.log('tenant param from URL:', urlParams.get('tenant'));

    this.tenantService.currentTenant$.subscribe({
      next: (tenant) => {
        console.log('Tenant received:', tenant);
        this.tenant = tenant;
        this.tenantLoading = false;

        if (tenant) {
          this.autoFillCredentials(tenant.id);
        }
      },
      error: (error) => {
        console.error('Error loading tenant:', error);
        this.tenantLoading = false;
        this.tenant = this.getDefaultTenant();
      }
    });

    this.tenantService.loadTenantConfig().subscribe({
      next: (tenant) => {
        console.log('Tenant loaded directly:', tenant);
        this.tenant = tenant;
        this.tenantLoading = false;
      },
      error: (error) => {
        console.error('Failed to load tenant config:', error);
        this.tenantLoading = false;
        this.tenant = this.getDefaultTenant();
      }
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  private autoFillCredentials(tenantId: string): void {
    if (tenantId === 'tenant1') {
      this.loginForm.patchValue({
        username: 'admin1',
        password: 'password123'
      });
    } else if (tenantId === 'tenant2') {
      this.loginForm.patchValue({
        username: 'admin2',
        password: 'password123'
      });
    }
  }

  private getDefaultTenant(): TenantConfig {
    console.log('Using default tenant');
    return {
      id: 'tenant1',
      name: 'Tenant One',
      subdomain: 'tenant1',
      layout: 'side',
      logo: 'assets/images/tentant1.webp',
      theme: {
        primaryColor: '#3f51b5',
        secondaryColor: '#ff4081',
        backgroundColor: '#f5f5f5',
        textColor: '#333333'
      },
      features: {}
    };
  }

  get f() {
    return this.loginForm.controls as {
      username: any;
      password: any;
    };
  }

  selectTenant(tenantId: string): void {
    console.log('Selecting tenant:', tenantId);
    localStorage.setItem('dev_tenant', tenantId);
    window.location.reload();
  }

  onSubmit(): void {
    console.log('Form submitted, tenant:', this.tenant);
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      console.log('Form invalid');
      return;
    }

    this.loading = true;
    console.log('Attempting login with:', this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        if (response.success) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.errorMessage = response.message || 'Login failed';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'An error occurred. Please try again.';
        this.loading = false;
      }
    });
  }

  switchTenant(tenantId: string): void {
    console.log('Switching to tenant:', tenantId);

    localStorage.setItem('forced_tenant', tenantId);

    // Update URL without reload
    const newUrl = `${window.location.origin}${window.location.pathname}?tenant=${tenantId}`;
    window.history.pushState({}, '', newUrl);

    // Reload tenant config
    this.tenantService.loadTenantConfig().subscribe(tenant => {
      console.log('Switched to tenant:', tenant);
      this.tenant = tenant;

      // Auto-fill credentials
      if (tenantId === 'tenant1') {
        this.loginForm.patchValue({ username: 'admin1', password: 'password123' });
      } else {
        this.loginForm.patchValue({ username: 'admin2', password: 'password123' });
      }
    });
  }
}