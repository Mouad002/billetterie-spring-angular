import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {AppEvent} from '../../model/event.model';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  public getEvents():Observable<Array<AppEvent>>{
    return this.http.get<Array<AppEvent>>(environment.backendHost+"/events")
  }
  public searchEvents(keyword : string):Observable<Array<AppEvent>>{
    return this.http.get<Array<AppEvent>>(environment.backendHost+"/events/search?keyword="+keyword)
  }
  public getEventDetails(id : number):Observable<AppEvent>{
    return this.http.get<AppEvent>(environment.backendHost+"/events/"+id)
  }
}
