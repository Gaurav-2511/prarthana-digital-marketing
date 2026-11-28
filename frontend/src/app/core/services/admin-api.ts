import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AdminDashboardResponse {
  status: string;
  message: string;
  access: string;
  totalServices: number;
  totalPortfolios: number;
  totalEnquiries: number;
  newEnquiries: number;
  inProgressEnquiries: number;
  resolvedEnquiries: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/admin`;

  getDashboard(): Observable<AdminDashboardResponse> {
    return this.http.get<AdminDashboardResponse>(
      `${this.apiUrl}/dashboard`
    );
  }
}
