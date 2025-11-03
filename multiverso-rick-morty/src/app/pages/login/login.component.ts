import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService,  } from '../../core/services/auth.service';
import { LoginCredentials } from '../../core/interfaces/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  forms: FormGroup;
  submitted = false;
  showPassword = false;
  messageError = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {
    this.forms = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  get controlForm() {
    return this.forms.controls;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    this.submitted = true;
    this.messageError = '';

    if (this.forms.invalid) {
      return;
    }

    const credentials: LoginCredentials = {
      email: this.forms.value.email,
      password: this.forms.value.password,
      remember: this.forms.value.remember
    };

    const success = this.authService.login(credentials);

    if (success) {
      this.router.navigate(['/profile']);
    } else {
      this.messageError = 'Email ou senha incorretos. Tente novamente.';
    }
  }

  firstAcess() {
    this.router.navigate(['/register']);
  } 
}