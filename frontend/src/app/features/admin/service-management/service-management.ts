import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ServiceApi,
  ServiceItem,
  ServiceRequest,
} from '../../../core/services/service-api';

@Component({
  selector: 'app-service-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-management.html',
  styleUrl: './service-management.scss',
})
export class ServiceManagement implements OnInit {
  private readonly serviceApi = inject(ServiceApi);

  services = signal<ServiceItem[]>([]);
  isLoading = signal(false);
  isSaving = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  isEditing = signal(false);
  editingId = signal<number | null>(null);
  showForm = signal(false);

  form: ServiceRequest = this.emptyForm();

  ngOnInit(): void {
    this.loadServices();
  }

  private emptyForm(): ServiceRequest {
    return {
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      icon: '',
      active: true,
      displayOrder: 0,
    };
  }

  loadServices(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.serviceApi.getAllServices().subscribe({
      next: (response) => {
        this.services.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load services:', error);
        this.errorMessage.set(
          error.error?.message || 'Unable to load services. Please try again.'
        );
        this.isLoading.set(false);
      },
    });
  }

  openAddForm(): void {
    this.resetForm();
    this.showForm.set(true);
  }

  onTitleChange(): void {
    this.form.slug = this.form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  editService(service: ServiceItem): void {
    this.form = {
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription || '',
      description: service.description || '',
      icon: service.icon || '',
      active: service.active,
      displayOrder: service.displayOrder,
    };

    this.editingId.set(service.id);
    this.isEditing.set(true);
    this.showForm.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  saveService(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    const request: ServiceRequest = {
      ...this.form,
      title: this.form.title.trim(),
      slug: this.form.slug.trim(),
      shortDescription: this.form.shortDescription.trim(),
      description: this.form.description.trim(),
      icon: this.form.icon.trim(),
    };

    this.isSaving.set(true);

    const request$ = this.isEditing() && this.editingId() !== null
      ? this.serviceApi.updateService(this.editingId()!, request)
      : this.serviceApi.createService(request);

    request$.subscribe({
      next: () => {
        this.successMessage.set(
          this.isEditing()
            ? 'Service updated successfully.'
            : 'Service created successfully.'
        );

        this.isSaving.set(false);
        this.resetForm();
        this.loadServices();
      },
      error: (error) => {
        console.error('Failed to save service:', error);
        this.errorMessage.set(
          error.error?.message || 'Unable to save service. Please try again.'
        );
        this.isSaving.set(false);
      },
    });
  }

  deleteService(service: ServiceItem): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${service.title}"?`
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');

    this.serviceApi.deleteService(service.id).subscribe({
      next: () => {
        this.successMessage.set('Service deleted successfully.');
        this.loadServices();
      },
      error: (error) => {
        console.error('Failed to delete service:', error);
        this.errorMessage.set(
          error.error?.message || 'Unable to delete service. Please try again.'
        );
      },
    });
  }

  cancelForm(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.form = this.emptyForm();
    this.isEditing.set(false);
    this.editingId.set(null);
    this.showForm.set(false);
  }
}
