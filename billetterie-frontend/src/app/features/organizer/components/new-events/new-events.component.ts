import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppEvent } from '../../../../../model/event.model';

@Component({
  selector: 'app-new-events',
  standalone: false,
  templateUrl: './new-events.component.html',
  styleUrl: './new-events.component.css'
})
export class NewEventsComponent implements OnInit{

  newEventFormGroup! : FormGroup;

  constructor(private fb:FormBuilder, private eventService : EventsService, private router : Router){}

  ngOnInit(): void {
    this.newEventFormGroup = this.fb.group({
      title : this.fb.control(null),
      description : this.fb.control(null),
      location : this.fb.control(null), 
      image : this.fb.control(null), 
      category : this.fb.control(null), 
      status : this.fb.control(null), 
      date : this.fb.control(null), 
      heure : this.fb.control(null)
    })
  }

   handleSaveEvent(){
    if(this.newEventFormGroup.invalid){
      Swal.fire({
        icon: "warning",
        title: "Formulaire invalide",
        text: "Veuillez remplir tous les champs avant de soumettre.",
      });
      return;
    }

    let event:AppEvent = this.newEventFormGroup.value;
    this.eventService.saveEvent(event).subscribe({
      next : data =>{
         Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Evenement ajouté avec succès",
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl("/my-events")
      },
      error : err =>{
         Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible d'ajouter l'Evenement !",
          footer: '<a href="#">Voir les détails</a>'
        });
      }
    })
  }


}
