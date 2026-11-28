import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '../../../core/services/auth-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private readonly authApi = inject(AuthApi);
  private readonly router = inject(Router);

  username = '';
  password = '';

  isSubmitting = signal(false);
  errorMessage = signal('');

  onLogin(): void {
    if (!this.username.trim() || !this.password) {
      this.errorMessage.set('Please enter username and password.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.authApi.login({
      username: this.username.trim(),
      password: this.password,
    }).subscribe({
      next: (response) => {
        if (response.role !== 'ADMIN') {
          this.errorMessage.set('Access denied. Admin account required.');
          this.isSubmitting.set(false);
          return;
        }

        sessionStorage.setItem('access_token', response.token);
        sessionStorage.setItem('admin_username', response.username);
        sessionStorage.setItem('admin_role', response.role);

        this.router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        console.error('Admin login failed:', error);

        if (error.status === 401 || error.status === 403) {
          this.errorMessage.set('Invalid username or password.');
        } else {
          this.errorMessage.set(
            'Unable to connect to the server. Please try again later.'
          );
        }

        this.isSubmitting.set(false);
      },
    });
  }
}
