import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface EventStatistics {
  totalTicketsSold: number;
  totalRevenue: number;
  ticketsSoldToday: number;
  percentageIncrease: number;
  averageTicketPrice: number;
  totalCapacity: number;
  startDate: string;
  endDate: string;
  salesByTicketType: {
    ticketType: string;
    quantity: number;
    revenue: number;
  }[];
  dailySales: {
    date: string;
    quantity: number;
    revenue: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private http: HttpClient) { }

  getEventStatistics(eventId: number): Observable<EventStatistics> {
    return this.http.get<EventStatistics>(`${environment.backendHost}/organizer/events/${eventId}/statistics`);
  }

  getDailySales(eventId: number): Observable<any> {
    return this.http.get(`${environment.backendHost}/organizer/events/${eventId}/daily-sales`);
  }

  getTicketTypeStats(eventId: number): Observable<any> {
    return this.http.get(`${environment.backendHost}/organizer/events/${eventId}/ticket-type-stats`);
  }

  exportStatistics(eventId: number): Observable<Blob> {
    return this.http.get(`${environment.backendHost}/organizer/events/${eventId}/export-statistics`, {
      responseType: 'blob'
    });
  }
} 