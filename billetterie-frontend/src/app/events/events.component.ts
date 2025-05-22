import { Component, OnInit } from '@angular/core';
import { AppEvent } from '../../model/home.model';
import { CommonModule } from '@angular/common';
import { Category } from '../../model/Category.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '../../model/PageEvent.model';
import { HomeService } from '../services/home.service';
@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events!: AppEvent[];    
 
  errorMessage: string = '';

 searchFormGroup : FormGroup | undefined;
 categories: string[] = [];
currentPage : number =0;
  pageSize : number =3;
  totalPages : number = 0;
  isCategoryFilterActive: boolean = false;
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
  this.isCategoryFilterActive = false; // <-- Ajouté ici
  let kw = this.searchFormGroup?.value.keyword;
  this.eventService.searchEvents(kw, page, size).pipe(
    catchError(err => {
      this.errorMessage = err.message;
      return throwError(() => err);
    })
  ).subscribe({
    next: data => {
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
  this.isCategoryFilterActive = true; // <-- Ajouté ici
  this.eventService.geteventsCat(cat).pipe(
    catchError(err => {
      this.errorMessage = err.message;
      return throwError(() => err);
    })
  ).subscribe({
    next: data => {
      this.events = data;
      this.totalPages = 0; // Optionnel, pour éviter de garder d'anciens chiffres
    },
    error: err => {
      this.errorMessage = err.message;
    }
  });
}


  


  
  

}