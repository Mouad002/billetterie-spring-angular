import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TicketType} from '../../../model/TicketType.model';
import {AppEvent} from '../../../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {
//For pass total price from TicketSelection Component to the Payment Component
  private totalPrice: number = 0;
  constructor(private http: HttpClient) { }
  getTicketTypesByEventId(eventId: number): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`${environment.backendHost}/ticketTypeList/${eventId}`);
  }
  saveTicketType(ticketType: TicketType):Observable<TicketType>{
    return this.http.post<TicketType>("http://localhost:8085/organizer/events/ticketType", ticketType);
  }
  //For pass total price from TicketSelection Component to the Payment Component
  setTotalPrice(price: number): void {
    this.totalPrice = price;
  }
//For pass total price from TicketSelection Component to the Payment Component
  getTotalPrice(): number {
    return this.totalPrice;
  }
}
