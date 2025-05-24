import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EventsService } from '../../services/events.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppEvent } from '../../../../../model/event.model';
import {TicketType} from '../../../../../model/TicketType.model';
import {ImageUploaderService} from '../../../../services/image-uploader.service';
import {TicketServiceService} from '../../../../services/ticketServices/ticket-service.service';
//import {ImageUploaderService} from '../../../../services/image-uploader.service';

@Component({
  selector: 'app-new-events',
  standalone: false,
  templateUrl: './new-events.component.html',
  styleUrl: './new-events.component.css'
})
export class NewEventsComponent implements OnInit{

  newEventFormGroup! : FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  ticketTypes: TicketType[] = [];
  formData: FormData = new FormData();
  imageName!: string;
  savedEvent!: AppEvent;

  constructor(private fb:FormBuilder, private eventService : EventsService, private router : Router, private imageUploaderService: ImageUploaderService, private ticketService: TicketServiceService){}

  ngOnInit(): void {
    this.newEventFormGroup = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      location: [null, Validators.required],
      image: [null],
      category: [null, Validators.required],
      status: [null, Validators.required],
      dateEvent: [null, Validators.required],
      heure: [null, Validators.required]
    });
    // Update ticketTypes array whenever form changes, filtering out invalid entries
    this.ticketTypesArray.valueChanges.subscribe((values: any[]) => {
      this.ticketTypes = values.filter(tt =>
        tt.ticketType && tt.price > 0 && tt.maxQuantity > 0 && tt.description
      );
      console.log("Filtered Ticket Types: ", this.ticketTypes);
    });
  }
  get ticketTypesArray(): FormArray {
    return this.newEventFormGroup.get('ticketTypes') as FormArray;
  }
  addTicketType(): void {
    const ticketFormGroup = this.fb.group({
      ticketType: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      maxQuantity: [0, [Validators.required, Validators.min(1)]],
      description: ['']
    });

    this.ticketTypesArray.push(ticketFormGroup);
    // No need to update this.ticketTypes here - subscription handles it
  }
  removeTicketType(index: number): void {
    this.ticketTypesArray.removeAt(index);
  }
  getTotalTickets(): number {
    return this.ticketTypesArray.controls.reduce((total, group) => {
      return total + (group.get('maxQuantity')?.value || 0);
    }, 0);
  }
  getPriceRange(): string {
    const prices = this.ticketTypesArray.controls.map(group => group.get('price')?.value || 0);
    if (prices.length === 0) return '0';
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `${min}` : `${min} - ${max}`;
  }




  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        console.log("Image Preview: ", this.imagePreview);
        console.log("Image name "+ file.name);
      };
      reader.readAsDataURL(file);

      this.formData.append('file', file);
    }
  }
  handleImageUpload() {
    this.imageUploaderService.handleUploadImage(this.formData);
  }
  saveTicketTypes() {
    const ticketTypes = this.ticketTypesArray.value;
    console.log("Ticket Types: ", ticketTypes);
    ticketTypes.forEach((ticketType: TicketType) => {
      this.ticketService.saveTicketType(ticketType).subscribe({
        next: (data) => {
          console.log("Ticket Type saved: ", data);
        },
        error: (err) => {
          console.error("Error saving ticket type: ", err);
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Impossible d'ajouter le type de billet !",
            footer: '<a href="#">Voir les détails</a>'
          });
        }
      });
    });
    console.log("Ticket Types with Event ID: ", ticketTypes);
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
        this.savedEvent = data;
        console.log("Saved Event: ", this.savedEvent);
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
    this.saveTicketTypes();
    this.handleImageUpload();
  }

}

