import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { AppEvent } from '../../../../../model/event.model';

@Component({
  selector: 'app-my-events',
  standalone: false,
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css',
})
export class MyEventsComponent implements OnInit{

  events! : Observable<Array<AppEvent>>;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  nameOrganizer! : string;

  constructor(private eventService : EventsService, private fb : FormBuilder){}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(""), 
    });
    this.getEvents();
    this.nameOrganizer = "Mohamed Amine";
  }

  handleSearchEvents(){
    let kw = this.searchFormGroup?.value.keyword;
    this.events = this.eventService.searchEvent(kw).pipe(
      catchError( err => {
        this.errorMessage = err.message;
        return throwError(err);
      } )
    );
  }

  getEvents(){
    this.events = this.eventService.getEvents().pipe(
      catchError( err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }

  

}
