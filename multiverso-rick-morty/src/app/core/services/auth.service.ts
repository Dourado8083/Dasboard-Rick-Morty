import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginCredentials } from '../interfaces/login';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private router: Router) {
    const token = localStorage.getItem('jwt_token');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      token ? this.getUserFromToken(token) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(name: string, email: string, password: string): boolean {
    const users = this.getAllUsers();
    const userExists = users.find(u => u.email === email);

    if (userExists) {
      return false;
    }

    const newUser: User = {
      id: this.generateId(),
      name,
      email,
      password: btoa(password),
      hasProfile: true 
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(credentials: LoginCredentials): boolean {

    
    const users = this.getAllUsers();
    
    const user = users.find(
      u => u.email === credentials.email && 
      u.password === btoa(credentials.password)
    );

    if (user) {
      
      const token = btoa(JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
      }));

      localStorage.setItem('jwt_token', token);
      
      if (credentials.remember) {
        localStorage.setItem('remember_me', 'true');
      }

      this.currentUserSubject.next(user);

      
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('remember_me');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const hasToken = !!localStorage.getItem('jwt_token');
    return hasToken;
  }

  hasProfile(): boolean {
    return this.isLoggedIn();
  }

  getCurrentUser(): User | null {
    let user = this.currentUserSubject.value;
    
    if (!user && this.isLoggedIn()) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        user = this.getUserFromToken(token);
        this.currentUserSubject.next(user);
      }
    }
    
    return user;
  }

  private getAllUsers(): User[] {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private getUserFromToken(token: string): User | null {
    try {
      const userData = JSON.parse(atob(token));
      const users = this.getAllUsers();
      return users.find(u => u.id === userData.id) || null;
    } catch {
      return null;
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}