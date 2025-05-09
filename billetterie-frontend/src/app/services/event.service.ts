import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  public getEvents():Observable<Array<Event>>{
    return this.http.get<Array<Event>>(environment.backendHost+"/events")
  }
  public searchEvents(keyword : string):Observable<Array<Event>>{
    return this.http.get<Array<Event>>(environment.backendHost+"/events/search?keyword="+keyword)
  }
}
