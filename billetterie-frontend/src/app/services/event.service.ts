import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
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
  public getEventImageUrl(imageName: string | undefined): string {
    if (!imageName) return '';
    return `${environment.backendHost}/api/events/${imageName}`;
  }
  public getEventImage(imageName: string | undefined): Observable<Blob> {
    if (!imageName) {
      return throwError(() => new Error('Image name is undefined'));
    }
    return this.http.get(`${environment.backendHost}/api/events/${imageName}`, {
      responseType: 'blob'
    });
  }
}
