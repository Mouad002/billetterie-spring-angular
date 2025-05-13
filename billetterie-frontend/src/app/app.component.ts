import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import { EventService } from './services/event.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {AppEvent} from '../model/event.model';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  events! : Observable<Array<AppEvent>>;
  errorMessage!: string;
  searchFormGroup : FormGroup | undefined;
  constructor(private eventService : EventService, private fb : FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchEvents();
  }
  handleSearchEvents() {
    let kw=this.searchFormGroup?.value.keyword;
    this.events=this.eventService.searchEvents(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }




}
