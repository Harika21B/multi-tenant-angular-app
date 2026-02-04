# Multi-Tenant Angular Application with RBAC

A comprehensive Angular application demonstrating multi-tenancy and role-based access control for two different tenants.

## Features

- **Multi-Tenant Architecture**: Single codebase serving two tenants with different themes and layouts
- **Dynamic Theming**: Tenant-specific colors, logos, and layouts
- **Role-Based Access Control**: Admin and User roles with different permissions
- **Responsive Design**: Works on desktop and mobile devices
- **Firebase Deployment**: Easy deployment to Firebase Hosting

## Tenant Configurations

### Tenant 1 (Side Navigation Layout)
- **Subdomain**: tenant1.yourdomain.com
- **Layout**: Side navigation
- **Primary Color**: Indigo (#3f51b5)
- **Secondary Color**: Pink (#ff4081)
- **Logo**: assets/images/tenant1-logo.png

### Tenant 2 (Top Navigation Layout)
- **Subdomain**: tenant2.yourdomain.com
- **Layout**: Top navigation
- **Primary Color**: Green (#4caf50)
- **Secondary Color**: Blue (#2196f3)
- **Logo**: assets/images/tenant2-logo.png

## Test Credentials

### Tenant 1 (tenant1.domain.com)
- **Admin**: username: `admin1`, password: `password123`
- **User**: username: `user1`, password: `password123`

### Tenant 2 (tenant2.domain.com)
- **Admin**: username: `admin2`, password: `password123`
- **User**: username: `user2`, password: `password123`

## Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- Angular CLI: `npm install -g @angular/cli`
- Firebase CLI: `npm install -g firebase-tools`

### 2. Clone and Install
```bash
git clone <repository-url>
cd multi-tenant-angular-app
npm install