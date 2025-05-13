import { Category } from './../../../../../model/Category.model';
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-events',
  standalone: false,
  templateUrl: './update-events.component.html',
  styleUrl: './update-events.component.css'
})
export class UpdateEventsComponent implements OnInit{

  eventFormGroup! : FormGroup ;
  eventId! : number;

  constructor(private eventService : EventsService, private router : Router, private fb : FormBuilder, private route : ActivatedRoute){}


  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventFormGroup = this.fb.group({
      title: [''], // c'est la méme chose que ca : title : this.fb.control(null),
      description: [''],
      location: [''],
      Image: [null],
      category: [''],
      status: [''],
      dateEvent: [''],
      heure: ['']
    })

     // Appel du backend pour récupérer l'événement à modifier
     this.eventService.getEventById(this.eventId).subscribe({
      next : (event) =>{
        this.eventFormGroup.patchValue({
          title : event.title,
          description : event.description,
          location : event.location,
          Category : event.category,
          status : event.status,
          dateEvent : event.dateEvent,
          heure : event.heure
        });
      },
      error : (err) => {
        console.error("Erreur lors du chargement de l'événement", err);
      }
     })
  }

  onUpdateEvent(){
    const updatedEvent = this.eventFormGroup.value;
    this.eventService.updateEvent(this.eventId, updatedEvent).subscribe({
      next : () =>{
        alert("Événement modifié avec succès !");
        this.router.navigateByUrl("/events"); // Redirection après succès
      },
      error : (err) =>{
        console.error("Erreur lors de la mise à jour de l'événement", err);
      }
    })
  }
}
