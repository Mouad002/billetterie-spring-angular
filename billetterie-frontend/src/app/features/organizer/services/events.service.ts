import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '../../../model/events.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http : HttpClient) { }

  searchEvent(keyword : string) : Observable<Array<Events>>{
    return this.http.get<Array<Events>>("http://localhost:8085/events/search?keyword="+keyword);
  }

  getEvents():Observable<Array<Events>>{
    return this.http.get<Array<Events>>("http://localhost:8085/events");
  }

  saveEvent(event : Events):Observable<Events>{
    return this.http.post<Events>("http://localhost:8085/events", event);
  }

  // changer l'URL
  getEventById(id : number):Observable<Events>{
    return this.http.get<Events>(`http://localhost:8085/events/${id}`);
  }


}
