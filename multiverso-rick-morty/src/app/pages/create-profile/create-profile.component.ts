import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss'
})
export class CreateProfileComponent {

  registerForm: FormGroup;
  submitted:boolean = false;
  showPassword:boolean = false;
  errorMessage:string = '';
  successMessage:string = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  FieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(this.submitted && field?.invalid);
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(this.submitted && field?.hasError(errorType));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      alert("Formulário inválido, verifique os campos.");
      return;
    }

    const { name, email, password } = this.registerForm.value;
    
    const success = this.authService.register(name, email, password);

    if (success) {
      this.successMessage = 'Cadastro realizado com sucesso! Redirecionando para login...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.errorMessage = 'Este email já está cadastrado. Tente outro ou faça login.';
    }
  }
}