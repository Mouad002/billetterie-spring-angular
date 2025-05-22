import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEvent } from '../../../../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http : HttpClient) { }

  searchEvent(keyword : string) : Observable<Array<AppEvent>>{
    return this.http.get<Array<AppEvent>>("http://localhost:8085/organizer/events/search?keyword="+keyword);
  }

  getEvents():Observable<Array<AppEvent>>{
    return this.http.get<Array<AppEvent>>("http://localhost:8085/organizer/events");
  }

    saveEvent(event: AppEvent):Observable<AppEvent>{
    return this.http.post<AppEvent>("http://localhost:8085/organizer/events", event);
  }

  // changer l'URL
  getEventById(id : number):Observable<AppEvent>{
    return this.http.get<AppEvent>(`http://localhost:8085/organizer/events/${id}`);
  }

  updateEvent(id : number, event : AppEvent) : Observable<AppEvent>{
    return this.http.put<AppEvent>(`http://localhost:8085/organizer/events/${id}`, event);
  }


}
