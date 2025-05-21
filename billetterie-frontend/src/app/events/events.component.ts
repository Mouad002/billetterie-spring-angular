import { Component, OnInit } from '@angular/core';
import { AppEvent } from '../../model/event.model';
import { CommonModule } from '@angular/common';
import { Category } from '../../model/Category.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '../../model/PageEvent.model';
import { HomeService } from '../services/home.service';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events!: AppEvent[];    
 
  errorMessage: string = '';

 searchFormGroup : FormGroup | undefined;
 categories: string[] = [];
currentPage : number =0;
  pageSize : number =2;
  totalPages : number = 0;
  constructor(private eventService: HomeService , private fb : FormBuilder) {}

  ngOnInit(): void {
     this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    // Extraction des catégories de l'enum
    this.categories = Object.values(Category);
    this.handleSearchEvents(this.currentPage, this.pageSize);


  }

   handleSearchEvents(page: number, size: number) {
    let kw = this.searchFormGroup?.value.keyword;
    this.eventService.searchEvents(kw, page, size).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => err);
      })
    ).subscribe({
      next: data => {
        // Modifier directement `this.events` avec les résultats
        this.events = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      },
      error: err => {
        this.errorMessage = err.message;
      }
    });
}
  

handleSearchEventsCat(cat: string) {
  this.eventService.geteventsCat(cat).pipe(
    catchError(err => {
      this.errorMessage = err.message;
      return throwError(() => err);
    })
  ).subscribe({
    next: data => {
      this.events = data; // data est un tableau de AppEvent
    },
    error: err => {
      this.errorMessage = err.message;
    }
  });
}

  }


  
  

