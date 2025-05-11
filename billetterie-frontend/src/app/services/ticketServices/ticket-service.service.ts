import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TicketType} from '../../../model/TicketType.model';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  constructor(private http: HttpClient) { }
  getTicketTypesByEventId(eventId: number): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`${environment.backendHost}/ticketTypeList/${eventId}`);
  }

}
