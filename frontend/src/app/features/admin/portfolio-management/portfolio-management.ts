
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  PortfolioApi,
  PortfolioItem,
  PortfolioRequest,
} from '../../../core/services/portfolio-api';

@Component({
  selector: 'app-portfolio-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio-management.html',
  styleUrl: './portfolio-management.scss',
})
export class PortfolioManagement implements OnInit {
  private readonly portfolioApi = inject(PortfolioApi);

  portfolios = signal<PortfolioItem[]>([]);
  isLoading = signal(false);
  isSaving = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  isEditing = signal(false);
  editingId = signal<number | null>(null);
  showForm = signal(false);

  form: PortfolioRequest = this.emptyForm();

  ngOnInit(): void {
    this.loadPortfolios();
  }

  private emptyForm(): PortfolioRequest {
    return {
      title: '',
      slug: '',
      category: '',
      description: '',
      imageUrl: '',
      projectUrl: '',
      featured: false,
      active: true,
      displayOrder: 0,
    };
  }

  loadPortfolios(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.portfolioApi.getAllPortfolios().subscribe({
      next: (data) => {
        this.portfolios.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(
          error.error?.message || 'Unable to load portfolio projects.'
        );
        this.isLoading.set(false);
      },
    });
  }

  openAddForm(): void {
    this.form = this.emptyForm();
    this.isEditing.set(false);
    this.editingId.set(null);
    this.showForm.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  onTitleChange(): void {
    if (!this.isEditing()) {
      this.form.slug = this.generateSlug(this.form.title);
    }
  }

  private generateSlug(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  editPortfolio(portfolio: PortfolioItem): void {
    this.form = {
      title: portfolio.title,
      slug: portfolio.slug,
      category: portfolio.category || '',
      description: portfolio.description || '',
      imageUrl: portfolio.imageUrl || '',
      projectUrl: portfolio.projectUrl || '',
      featured: portfolio.featured,
      active: portfolio.active,
      displayOrder: portfolio.displayOrder,
    };

    this.isEditing.set(true);
    this.editingId.set(portfolio.id);
    this.showForm.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  savePortfolio(): void {
    if (this.isSaving()) {
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');

    const request: PortfolioRequest = {
      ...this.form,
      title: this.form.title.trim(),
      slug: this.form.slug.trim(),
      category: this.form.category.trim(),
      description: this.form.description.trim(),
      imageUrl: this.form.imageUrl.trim(),
      projectUrl: this.form.projectUrl.trim(),
    };

    this.isSaving.set(true);

    const editingId = this.editingId();

    const request$ =
      this.isEditing() && editingId !== null
        ? this.portfolioApi.updatePortfolio(editingId, request)
        : this.portfolioApi.createPortfolio(request);

    request$.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.successMessage.set(
          this.isEditing()
            ? 'Portfolio project updated successfully.'
            : 'Portfolio project created successfully.'
        );
        this.showForm.set(false);
        this.form = this.emptyForm();
        this.loadPortfolios();
      },
      error: (error) => {
        this.isSaving.set(false);
        this.errorMessage.set(
          error.error?.message || 'Unable to save portfolio project.'
        );
      },
    });
  }

  deletePortfolio(portfolio: PortfolioItem): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${portfolio.title}"?`
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');

    this.portfolioApi.deletePortfolio(portfolio.id).subscribe({
      next: () => {
        this.successMessage.set('Portfolio project deleted successfully.');
        this.loadPortfolios();
      },
      error: (error) => {
        this.errorMessage.set(
          error.error?.message || 'Unable to delete portfolio project.'
        );
      },
    });
  }

  cancelForm(): void {
    this.showForm.set(false);
    this.form = this.emptyForm();
    this.isEditing.set(false);
    this.editingId.set(null);
  }
}
