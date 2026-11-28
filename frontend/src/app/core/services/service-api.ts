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

@Injectable({
  providedIn: 'root',
})
export class ServiceApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/services`;

  getActiveServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiUrl}/active`);
  }
}
