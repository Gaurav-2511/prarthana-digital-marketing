import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  PortfolioApi,
  PortfolioItem,
} from '../../core/services/portfolio-api';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
  private readonly portfolioApi = inject(PortfolioApi);

  portfolios = signal<PortfolioItem[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.loadPortfolios();
  }

  private loadPortfolios(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.portfolioApi.getActivePortfolios().subscribe({
      next: (data) => {
        this.portfolios.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load portfolios:', error);
        this.errorMessage.set(
          'Unable to load portfolio projects. Please try again later.'
        );
        this.isLoading.set(false);
      },
    });
  }
}
