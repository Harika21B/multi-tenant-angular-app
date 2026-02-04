import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { TenantConfig } from '../../models/tentant.model';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private currentTenant = new BehaviorSubject<TenantConfig | null>(null);
  currentTenant$ = this.currentTenant.asObservable();

  private readonly TENANT_CONFIG_URL = 'assets/config/tenants.json';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeTenant();
  }

  private initializeTenant(): void {
    const tenantId = this.detectTenantFromSubdomain();
    console.log('Initializing tenant:', tenantId);

    this.loadTenantConfig().subscribe({
      next: (tenant) => {
        console.log('Tenant initialized successfully:', tenant);
      },
      error: (error) => {
        console.error('Failed to initialize tenant:', error);
        this.createDefaultTenant(tenantId);
      }
    });
  }

  detectTenantFromSubdomain(): string {
    if (isPlatformBrowser(this.platformId)) {
      const hostname = window.location.hostname;
      console.log('Current hostname:', hostname);

      if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
        const urlParams = new URLSearchParams(window.location.search);
        const tenantParam = urlParams.get('tenant');

        if (tenantParam && (tenantParam === 'tenant1' || tenantParam === 'tenant2')) {
          console.log('Using tenant from URL parameter:', tenantParam);
          return tenantParam;
        }

        const storedTenant = localStorage.getItem('dev_tenant');
        if (storedTenant) {
          console.log('Using tenant from localStorage:', storedTenant);
          return storedTenant;
        }
      }

      const parts = hostname.split('.');
      if (parts.length > 1) {
        const subdomain = parts[0];
        if (subdomain === 'tenant1' || subdomain === 'tenant2') {
          return subdomain;
        }
      }
    }

    return 'tenant1';
  }

  loadTenantConfig(): Observable<TenantConfig> {
    const tenantId = this.detectTenantFromSubdomain();
    console.log('Loading config for tenant:', tenantId);

    return this.http.get<{ tenants: TenantConfig[] }>(this.TENANT_CONFIG_URL).pipe(
      map(response => {
        console.log('Tenant config loaded:', response);
        const tenant = response.tenants.find(t => t.id === tenantId);
        if (!tenant) {
          console.warn(`Tenant ${tenantId} not found, using first tenant`);
          return response.tenants[0];
        }
        this.setCurrentTenant(tenant);
        return tenant;
      }),
      catchError(error => {
        console.error('Error loading tenant config:', error);
        return of(this.createDefaultTenant(tenantId));
      })
    );
  }

  private createDefaultTenant(tenantId: string): TenantConfig {
    console.log('Creating default tenant for:', tenantId);

    const defaultTenants: Record<string, TenantConfig> = {
      'tenant1': {
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
      },
      'tenant2': {
        id: 'tenant2',
        name: 'Tenant Two',
        subdomain: 'tenant2',
        layout: 'top',
        logo: 'assets/images/tentant2.webp',
        theme: {
          primaryColor: '#4caf50',
          secondaryColor: '#2196f3',
          backgroundColor: '#ffffff',
          textColor: '#222222'
        },
        features: {}
      }
    };

    const defaultTenant = defaultTenants[tenantId] || defaultTenants['tenant1'];
    this.setCurrentTenant(defaultTenant);
    return defaultTenant;
  }

  setCurrentTenant(tenant: TenantConfig): void {
    console.log('Setting current tenant:', tenant.id);
    this.currentTenant.next(tenant);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentTenant', JSON.stringify(tenant));
      localStorage.setItem('dev_tenant', tenant.id);
    }
  }

  getCurrentTenant(): TenantConfig | null {
    return this.currentTenant.value;
  }

  getTenantLayout(): 'side' | 'top' {
    return this.currentTenant.value?.layout || 'side';
  }
}