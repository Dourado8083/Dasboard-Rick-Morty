import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
  nameUser: string = '';
  emailUser: string = '';
  sidebarOpen: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    if (user) {
      this.nameUser = user.name;
      this.emailUser = user.email;
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    if (confirm('Tem certeza que deseja sair?')) {
      this.authService.logout();
    }
  }

  getInitials(): string {
    if (!this.nameUser) return '??';

    return this.nameUser
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long'
    });
  }
}