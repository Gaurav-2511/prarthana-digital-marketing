
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  active: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceRequest {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  active: boolean;
  displayOrder: number;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/services`;

  // Get all services (Admin)
  getAllServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(this.apiUrl);
  }

  // Get active services (Public Website)
  getActiveServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiUrl}/active`);
  }

  // Get service by ID
  getServiceById(id: number): Observable<ServiceItem> {
    return this.http.get<ServiceItem>(`${this.apiUrl}/${id}`);
  }

  // Create service
  createService(request: ServiceRequest): Observable<ServiceItem> {
    return this.http.post<ServiceItem>(this.apiUrl, request);
  }

  // Update service
  updateService(
    id: number,
    request: ServiceRequest
  ): Observable<ServiceItem> {
    return this.http.put<ServiceItem>(`${this.apiUrl}/${id}`, request);
  }

  // Delete service
  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
