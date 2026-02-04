# Multi-Tenant Angular Application with Role-Based Access Control (RBAC)

## 📋 Project Overview
A production-ready Angular 17+ application demonstrating multi-tenancy architecture with two distinct tenants, each having unique themes, layouts, and role-based access control.

## 🌐 Live Demo URLs
*(To be deployed to Firebase)*
- **Tenant 1:** https://tenant1-rba-harika.web.app
- **Tenant 2:** https://tenant2-rba-harika.web.app

## 🏗️ Features
- **Multi-Tenant Architecture**: Two tenants with different themes/layouts
- **Role-Based Access Control**: Admin/User roles with different permissions
- **Dynamic Theming**: CSS variables based on tenant
- **Firebase Hosting**: Ready for deployment

## 🔐 Test Credentials

### Tenant 1 (Side Navigation)
- **Admin:** `admin1` / `password123`
- **User:** `user1` / `password123`

### Tenant 2 (Top Navigation)
- **Admin:** `admin2` / `password123`
- **User:** `user2` / `password123`

## 🚀 Quick Start
```bash
# Clone repository
git clone https://github.com/Harika21B/multi-tenant-angular-app.git

# Install dependencies
npm install

# Run development server
ng serve

# Access at http://localhost:4200
# For Tenant 2: http://localhost:4200?tenant=tenant2