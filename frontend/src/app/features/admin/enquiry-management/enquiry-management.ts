
import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EnquiryApi, EnquiryItem } from '../../../core/services/enquiry-api';

@Component({
  selector: 'app-enquiry-management',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './enquiry-management.html',
  styleUrl: './enquiry-management.scss',
})
export class EnquiryManagement implements OnInit {
  private readonly enquiryApi = inject(EnquiryApi);

  enquiries = signal<EnquiryItem[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');
  successMessage = signal('');
  updatingId = signal<number | null>(null);
  deletingId = signal<number | null>(null);

  ngOnInit(): void {
    this.loadEnquiries();
  }

  loadEnquiries(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.enquiryApi.getAllEnquiries().subscribe({
      next: (data) => {
        this.enquiries.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(
          error?.error?.message || 'Unable to load enquiries. Please try again.'
        );
        this.isLoading.set(false);
      },
    });
  }

  updateStatus(enquiry: EnquiryItem, status: EnquiryItem['status']): void {
    if (enquiry.status === status || this.updatingId() !== null) {
      return;
    }

    this.successMessage.set('');
    this.errorMessage.set('');
    this.updatingId.set(enquiry.id);

    this.enquiryApi.updateEnquiryStatus(enquiry.id, { status }).subscribe({
      next: (updatedEnquiry) => {
        this.enquiries.update((items) =>
          items.map((item) =>
            item.id === updatedEnquiry.id ? updatedEnquiry : item
          )
        );
        this.successMessage.set('Enquiry status updated successfully.');
        this.updatingId.set(null);
      },
      error: (error) => {
        this.errorMessage.set(
          error?.error?.message || 'Unable to update enquiry status.'
        );
        this.updatingId.set(null);
      },
    });
  }

  deleteEnquiry(enquiry: EnquiryItem): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete the enquiry from ${enquiry.name}?`
    );

    if (!confirmed || this.deletingId() !== null) {
      return;
    }

    this.successMessage.set('');
    this.errorMessage.set('');
    this.deletingId.set(enquiry.id);

    this.enquiryApi.deleteEnquiry(enquiry.id).subscribe({
      next: () => {
        this.enquiries.update((items) =>
          items.filter((item) => item.id !== enquiry.id)
        );
        this.successMessage.set('Enquiry deleted successfully.');
        this.deletingId.set(null);
      },
      error: (error) => {
        this.errorMessage.set(
          error?.error?.message || 'Unable to delete enquiry.'
        );
        this.deletingId.set(null);
      },
    });
  }

  getStatusLabel(status: EnquiryItem['status']): string {
    switch (status) {
      case 'NEW':
        return 'New';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'RESOLVED':
        return 'Resolved';
      default:
        return status;
    }
  }
}
