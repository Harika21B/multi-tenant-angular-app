export interface TenantConfig {
  id: string;
  name: string;
  subdomain: string;
  layout: 'side' | 'top';
  logo: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  features: {
    [key: string]: boolean;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  tenantId: string;
  token?: string;
}