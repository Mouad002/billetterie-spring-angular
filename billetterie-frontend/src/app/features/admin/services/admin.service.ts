import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEvaluation } from '../components/evaluate-event/evaluate-event.component';

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface UpdateEventStatusInterface {
  id: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  fetchTableData(
    page: number,
    pageSize: number
  ): Observable<PaginatedResponse<EventEvaluation>> {
    const href = 'http://localhost:8085/admin/events-evaluation';
    const requestUrl = `${href}?page=${page}&size=${pageSize}`;
    return this.http.get<PaginatedResponse<EventEvaluation>>(requestUrl);
  }

  acceptEvent(item: UpdateEventStatusInterface): Observable<any> {
    const href = 'http://localhost:8085/admin/changing-event-status';
    return this.http.put<any>(href,item);
  }

}
