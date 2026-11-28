
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EnquiryApi, EnquiryRequest } from '../../core/services/enquiry-api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly enquiryApi = inject(EnquiryApi);

  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  form: EnquiryRequest = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  onSubmit(enquiryForm: NgForm): void {
    if (this.isSubmitting()) {
      return;
    }

    this.successMessage.set('');
    this.errorMessage.set('');

    const request: EnquiryRequest = {
      name: this.form.name.trim(),
      email: this.form.email.trim(),
      phone: this.form.phone.trim(),
      subject: this.form.subject.trim(),
      message: this.form.message.trim(),
    };

    if (
      !request.name ||
      !request.email ||
      !request.phone ||
      !request.subject ||
      !request.message
    ) {
      this.errorMessage.set('Please fill in all required fields.');
      return;
    }

    this.isSubmitting.set(true);

    this.enquiryApi.createEnquiry(request).subscribe({
      next: () => {
        this.successMessage.set(
          'Thank you! Your enquiry has been submitted successfully. We will get back to you soon.'
        );

        this.form = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        };

        enquiryForm.resetForm(this.form);
        this.isSubmitting.set(false);
      },
      error: (error) => {
        this.errorMessage.set(
          error?.error?.message ||
            'Something went wrong. Please try again or contact us on WhatsApp.'
        );
        this.isSubmitting.set(false);
      },
    });
  }
}
