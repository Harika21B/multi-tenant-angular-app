import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TenantConfig } from '../../models/tentant.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  applyTheme(tenant: TenantConfig): void {
    const root = document.documentElement;

    this.renderer.setStyle(root, '--primary-color', tenant.theme.primaryColor);
    this.renderer.setStyle(root, '--secondary-color', tenant.theme.secondaryColor);
    this.renderer.setStyle(root, '--background-color', tenant.theme.backgroundColor);
    this.renderer.setStyle(root, '--text-color', tenant.theme.textColor);

    this.renderer.addClass(document.body, `tenant-${tenant.id}`);
    this.renderer.addClass(document.body, `layout-${tenant.layout}`);
  }

  clearThemes(): void {
    const bodyClasses = document.body.classList;
    Array.from(bodyClasses).forEach(className => {
      if (className.startsWith('tenant-') || className.startsWith('layout-')) {
        this.renderer.removeClass(document.body, className);
      }
    });
  }
}