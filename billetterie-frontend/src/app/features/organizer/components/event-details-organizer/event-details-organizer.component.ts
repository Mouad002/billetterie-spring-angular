import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { AppEvent } from '../../../../../model/event.model';

@Component({
  selector: 'event-details-organizer',
  standalone: false,
  templateUrl: './event-details-organizer.component.html',
  styleUrl: './event-details-organizer.component.css'
})
export class EventDetailsOrganizerComponent implements OnInit {

  eventsDeteils! : AppEvent;
  eventId! : number;

  constructor(private eventService : EventsService, private router : Router, private route : ActivatedRoute){}
  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(this.eventId).subscribe({
      next : (event) =>{
        this.eventsDeteils = event;
      },
      error : (err) =>{
        console.error("Erreur lors du chargement de l'événement", err);
      }
    })
  }

}
