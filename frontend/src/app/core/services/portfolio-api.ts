
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

export interface PortfolioRequest {
  title: string;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  featured: boolean;
  active: boolean;
  displayOrder: number;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/portfolios`;

  getAllPortfolios(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(this.apiUrl);
  }

  getActivePortfolios(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(`${this.apiUrl}/active`);
  }

  getFeaturedPortfolios(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>(`${this.apiUrl}/featured`);
  }

  getPortfolioById(id: number): Observable<PortfolioItem> {
    return this.http.get<PortfolioItem>(`${this.apiUrl}/${id}`);
  }

  createPortfolio(request: PortfolioRequest): Observable<PortfolioItem> {
    return this.http.post<PortfolioItem>(this.apiUrl, request);
  }

  updatePortfolio(
    id: number,
    request: PortfolioRequest
  ): Observable<PortfolioItem> {
    return this.http.put<PortfolioItem>(`${this.apiUrl}/${id}`, request);
  }

  deletePortfolio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
