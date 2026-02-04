# Create complete README.md
@"
# Multi-Tenant Angular Application with Role-Based Access Control (RBAC)

## 📋 Project Overview
A production-ready Angular 17+ application demonstrating multi-tenancy architecture with two distinct tenants, each having unique themes, layouts, and role-based access control.

## 🌐 Live Demo
- **Tenant 1:** https://tenant1-rba-harika.web.app
- **Tenant 2:** https://tenant2-rba-harika.web.app

*(Note: Deploy to Firebase to activate these URLs)*

## ✨ Features
- **Multi-Tenant Architecture**: Single codebase serving two tenants
- **Dynamic Theming**: Tenant-specific colors, logos, and layouts
- **Role-Based Access Control**: Admin/User roles with different permissions
- **Secure Authentication**: JWT-based with route guards
- **Firebase Hosting**: Ready for deployment

## 🏢 Tenant Configuration

### Tenant 1 - 'Tenant One'
- **Layout**: Side navigation
- **Primary Color**: Indigo (#3f51b5)
- **Secondary Color**: Pink (#ff4081)
- **Access**: https://tenant1-rba-harika.web.app

### Tenant 2 - 'Tenant Two'
- **Layout**: Top navigation
- **Primary Color**: Green (#4caf50)
- **Secondary Color**: Blue (#2196f3)
- **Access**: https://tenant2-rba-harika.web.app

## 🔐 Test Credentials

### Tenant 1 (Side Navigation):
| Role | Username | Password | Permissions |
|------|----------|----------|-------------|
| Admin | \`admin1\` | \`password123\` | Full access to all features |
| User | \`user1\` | \`password123\` | Limited access, no admin panel |

### Tenant 2 (Top Navigation):
| Role | Username | Password | Permissions |
|------|----------|----------|-------------|
| Admin | \`admin2\` | \`password123\` | Full access to all features |
| User | \`user2\` | \`password123\` | Limited access, no admin panel |

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- Angular CLI 17 or higher

### Installation
\`\`\`bash
# Clone repository
git clone https://github.com/Harika21B/multi-tenant-angular-app.git
cd multi-tenant-angular-app

# Install dependencies
npm install

# Start development server
ng serve
\`\`\`

### Access Application
- **Default (Tenant 1):** http://localhost:4200
- **Tenant 2:** http://localhost:4200?tenant=tenant2

## 🚀 Firebase Deployment Instructions

### Step 1: Create Firebase Projects
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create two projects:
   - **Tenant 1:** Project ID: \`tenant1-rba-harika\`
   - **Tenant 2:** Project ID: \`tenant2-rba-harika\`

### Step 2: Install Firebase CLI
\`\`\`bash
npm install -g firebase-tools
firebase login
\`\`\`

### Step 3: Update Configuration
Update \`.firebaserc\` with your actual project IDs if different.

### Step 4: Deploy Commands
\`\`\`bash
# Build for production
npm run build:prod

# Deploy Tenant 1
npm run deploy:tenant1

# Deploy Tenant 2
npm run deploy:tenant2

# Or deploy both
npm run deploy:all
\`\`\`

### Step 5: Verify Deployment
After deployment, access:
- **Tenant 1:** https://tenant1-rba-harika.web.app
- **Tenant 2:** https://tenant2-rba-harika.web.app

## 📁 Project Structure
\`\`\`
multi-tenant-angular-app/
├── src/                    # Angular source code
├── firebase.json          # Firebase hosting configuration
├── .firebaserc            # Multi-tenant project mapping
├── README.md              # Documentation
└── package.json           # NPM scripts and dependencies
\`\`\`

## 🔧 Configuration Files

### Firebase Configuration
- \`firebase.json\` - Hosting settings
- \`.firebaserc\` - Project aliases for multi-tenancy

### Tenant Configuration
Location: \`src/assets/config/tenants.json\`
Contains theme colors, logos, and layout settings for both tenants.

## 🛡️ Security Implementation
- **AuthGuard**: Protects routes from unauthenticated users
- **RoleGuard**: Restricts admin routes to admin users only
- **Route Protection**: Role-based access to dashboard and admin pages

## 📄 License
MIT License

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📧 Contact
**GitHub:** https://github.com/Harika21B  
**Repository:** https://github.com/Harika21B/multi-tenant-angular-app

---
*Last Updated: $(Get-Date -Format 'yyyy-MM-dd')*
"@ | Out-File -FilePath README.md -Encoding UTF8