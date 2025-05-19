import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppEvent } from '../../model/home.model';
import { Category } from '../../model/Category.model';
import { PageEvent } from '../../model/PageEvent.model';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  public getEvents(page : number, size : number):Observable<PageEvent>{
    return this.http.get<PageEvent>(environment.backendHost+"/home?page="+page+"&size="+size);
  }
  public searchEvents(keyword: string, page: number, size: number): Observable<{ content: AppEvent[], totalPages: number, number: number }> {
  return this.http.get<{ content: AppEvent[], totalPages: number, number: number }>(
    `${environment.backendHost}/home/search?keyword=${keyword}&page=${page}&size=${size}`
  );

  }




  



 public geteventsCat(cat : String): Observable<Array<AppEvent>> {
  return this.http.get<Array<AppEvent>>(environment.backendHost+"/home/searchByCat?category="+cat)
  
};

}





