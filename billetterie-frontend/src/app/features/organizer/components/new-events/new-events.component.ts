import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {ImageUploaderService} from '../../../../services/image-uploader.service';
import {AppEvent} from '../../../../../model/event.model';
import {TicketType} from '../../../../../model/TicketType.model';

@Component({
  selector: 'app-new-events',
  standalone: false,
  templateUrl: './new-events.component.html',
  styleUrl: './new-events.component.css'
})
export class NewEventsComponent implements OnInit{

  newEventFormGroup! : FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  ticketTypes: TicketType[] = [];



  constructor(private fb:FormBuilder, private eventService : EventsService, private router : Router,private imageUploaderService: ImageUploaderService){}

  ngOnInit(): void {
    this.newEventFormGroup = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    location: [null, Validators.required],
    image: ["1.jpg"],
    category: [null, Validators.required],
    status: [null, Validators.required],
    dateEvent: [null, Validators.required],
    heure: [null, Validators.required],
      ticketTypes: this.fb.array([])
    });
    // Update ticketTypes array whenever form changes, filtering out invalid entries
    this.ticketTypesArray.valueChanges.subscribe((values: any[]) => {
      this.ticketTypes = values.filter(tt =>
        tt.name && tt.price > 0 && tt.quantity > 0
      );
      console.log("Filtered Ticket Types: ", this.ticketTypes);
    });
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




  // onFileSelected(event: Event): void {
  //   const file = (event.target as HTMLInputElement)?.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreview = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.formData.append('image', file);
  //   }
  // }



  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  // handleUploadImage(): void {
    // this.imageUploaderService.handleUploadImage(this.formData);
    // console.log(this.formData)
  //   if (!this.selectedFile) {
  //     alert("Veuillez sélectionner une image !");
  //     return;
  //   }
  //
  //   this.imageUploaderService.uploadImage(this.selectedFile).subscribe({
  //     next: (filename) => {
  //       console.log('Upload success:', filename);
  //       alert(`Image uploadée avec succès ! Nom du fichier : ${filename}`);
  //       this.selectedFile = null;
  //       this.imagePreview = null;
  //     },
  //     error: (err) => {
  //       console.error('Upload error:', err);
  //       alert("Erreur lors de l'upload de l'image !");
  //     }
  //   });
  // }


  get ticketTypesArray(): FormArray {
    return this.newEventFormGroup.get('ticketTypes') as FormArray;
  }
  addTicketType(): void {
    const ticketFormGroup = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
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
      return total + (group.get('quantity')?.value || 0);
    }, 0);
  }

  getPriceRange(): string {
    const prices = this.ticketTypesArray.controls.map(group => group.get('price')?.value || 0);
    if (prices.length === 0) return '0';
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `${min}` : `${min} - ${max}`;
  }
}
