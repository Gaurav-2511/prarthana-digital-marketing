import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceApi, ServiceItem } from '../../core/services/service-api';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit {
  private readonly serviceApi = inject(ServiceApi);

  services = signal<ServiceItem[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.serviceApi.getActiveServices().subscribe({
      next: (data) => {
        this.services.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load services:', error);
        this.errorMessage.set(
          'Unable to load services. Please try again later.'
        );
        this.isLoading.set(false);
      },
    });
  }
}
