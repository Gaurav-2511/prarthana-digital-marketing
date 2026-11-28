
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface EnquiryItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface EnquiryStatusRequest {
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
}

@Injectable({
  providedIn: 'root',
})
export class EnquiryApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/enquiries`;

  createEnquiry(request: EnquiryRequest): Observable<EnquiryItem> {
    return this.http.post<EnquiryItem>(this.apiUrl, request);
  }

  getAllEnquiries(): Observable<EnquiryItem[]> {
    return this.http.get<EnquiryItem[]>(this.apiUrl);
  }

  getEnquiryById(id: number): Observable<EnquiryItem> {
    return this.http.get<EnquiryItem>(`${this.apiUrl}/${id}`);
  }

  updateEnquiryStatus(
    id: number,
    request: EnquiryStatusRequest
  ): Observable<EnquiryItem> {
    return this.http.put<EnquiryItem>(
      `${this.apiUrl}/${id}/status`,
      request
    );
  }

  deleteEnquiry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
