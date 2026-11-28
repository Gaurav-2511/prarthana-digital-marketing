
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  AdminApi,
  AdminDashboardResponse,
} from '../../../core/services/admin-api';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly router = inject(Router);
  private readonly adminApi = inject(AdminApi);

  username = signal(
    sessionStorage.getItem('admin_username') || 'Admin'
  );

  dashboardData = signal<AdminDashboardResponse | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.adminApi.getDashboard().subscribe({
      next: (response) => {
        this.dashboardData.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load admin dashboard:', error);

        if (error.status === 401 || error.status === 403) {
          this.logout();
          return;
        }

        this.errorMessage.set(
          'Unable to load dashboard. Please try again later.'
        );

        this.isLoading.set(false);
      },
    });
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('admin_username');
    sessionStorage.removeItem('admin_role');

    this.router.navigate(['/admin/login']);
  }
}
