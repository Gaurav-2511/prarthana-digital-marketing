
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  featured: boolean;
  active: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/portfolios`;

  getActivePortfolios(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(`${this.apiUrl}/active`);
  }

  getFeaturedPortfolios(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(`${this.apiUrl}/featured`);
  }
}
