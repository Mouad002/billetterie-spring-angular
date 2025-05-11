import {Component, OnInit} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {catchError, throwError} from 'rxjs';
import {AppEvent} from '../../../../model/event.model';

@Component({
  selector: 'event-details',
  standalone: false,
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit{
  event: AppEvent | null = null;
  errorMessage!: string;

  constructor(private eventService: EventService) {
  }
  ngOnInit(): void {
    this.getEventDetails(1)
  }

  getEventDetails(id: number = 1) {
    this.eventService.getEventDetails(id).pipe(
      catchError(error => {
        this.errorMessage = error.message;
        return throwError(() => error);
      })
    ).subscribe({
      next: data => {
        this.event = data

      },
      error: err => console.error(err)
    });
  }


}
