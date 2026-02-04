import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../../models/tentant.model';
import { LoginCredentials, AuthResponse } from '../../models/user.modal';
import { TenantService } from './tentant.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);

  // Mock users database
  private mockUsers: User[] = [
    { id: '1', username: 'admin1', email: 'admin@tenant1.com', role: 'admin', tenantId: 'tenant1' },
    { id: '2', username: 'user1', email: 'user@tenant1.com', role: 'user', tenantId: 'tenant1' },
    { id: '3', username: 'admin2', email: 'admin@tenant2.com', role: 'admin', tenantId: 'tenant2' },
    { id: '4', username: 'user2', email: 'user@tenant2.com', role: 'user', tenantId: 'tenant2' }
  ];

  constructor(
    private router: Router,
    private tenantService: TenantService
  ) {
    this.loadStoredUser();
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const currentTenant = this.tenantService.detectTenantFromSubdomain();

    console.log('Login attempt:', {
      username: credentials.username,
      tenantId: currentTenant,
      allUsers: this.mockUsers
    });

    return of(null).pipe(
      delay(1000),
      map(() => {
        const user = this.mockUsers.find(u => {
          console.log('Checking user:', {
            dbUsername: u.username,
            inputUsername: credentials.username,
            dbTenant: u.tenantId,
            currentTenant: currentTenant,
            passwordMatch: this.validatePassword(credentials.password, u.username)
          });

          return u.username === credentials.username &&
            u.tenantId === currentTenant &&
            this.validatePassword(credentials.password, u.username);
        });

        if (user) {
          console.log('User found:', user);
          const userWithToken = { ...user, token: this.generateToken() };
          this.setCurrentUser(userWithToken);
          return { success: true, user: userWithToken };
        }

        console.log('No user found matching criteria');
        return {
          success: false,
          message: `Invalid credentials. Make sure you're on the correct tenant (${currentTenant})`
        };
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser.value;
  }

  hasRole(requiredRole: string): boolean {
    const user = this.currentUser.value;
    return !!user && user.role === requiredRole;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.next(JSON.parse(storedUser));
    }
  }

  private setCurrentUser(user: User): void {
    this.currentUser.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private validatePassword(password: string, username: string): boolean {
    const isValid = password === 'password123';
    console.log(`Password validation: ${password} === 'password123' = ${isValid}`);
    return isValid;
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}