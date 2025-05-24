import {Component, OnInit} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {catchError, throwError} from 'rxjs';
import {AppEvent} from '../../../../model/event.model';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'event-details',
  standalone: false,
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit{
  event: AppEvent | null = null;
  errorMessage!: string;
  eventImageUrl: string | null = null;
  eventImageSafeUrl: SafeUrl | null = null;
  imageLoading = false;
  constructor(private eventService: EventService, private sanitizer: DomSanitizer) {
  }
  ngOnInit(): void {
    this.getEventDetails(21)
  }
  extractFileName(filePath: string): string {
    return filePath.replace(/^.*[\\\/]/, '');
  }
  getEventDetails(id: number = 21) {
    this.eventService.getEventDetails(id).pipe(
      catchError(error => {
        this.errorMessage = error.message;
        return throwError(() => error);
      })
    ).subscribe({
      next: data => {
        this.event = data
// Get image URL
        if (this.event && this.event.image) {
          // @ts-ignore
          this.eventImageUrl = this.eventService.getEventImageUrl(this.event.image);
          // @ts-ignore
          this.loadEventImage(this.event.image);
          console.log(this.event.image);
        }
      },
      error: err => console.error(err)
    });
  }


  // loadEventImage(imageName: string) {
  //   this.imageLoading = true;
  //   this.eventService.getEventImage(imageName).pipe(
  //     catchError(error => {
  //       console.error('Error loading image:', error);
  //       this.imageLoading = false;
  //       return throwError(() => error);
  //     })
  //   ).subscribe({
  //     next: (imageBlob: Blob) => {
  //       // Create a URL for the blob
  //       const objectURL = URL.createObjectURL(imageBlob);
  //       this.eventImageSafeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //       this.imageLoading = false;
  //     },
  //     error: err => {
  //       console.error('Error processing image:', err);
  //       this.imageLoading = false;
  //     }
  //   });
  // }
  loadEventImage(imageName: string) {
    const cleanImageName = this.extractFileName(imageName);
    if (!cleanImageName) return;
    this.imageLoading = true;
    this.eventService.getEventImage(cleanImageName).pipe(
      catchError(error => {
        console.error('Error loading image:', error);
        this.imageLoading = false;
        return throwError(() => error);
      })
    ).subscribe({
      next: (imageBlob: Blob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.eventImageSafeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.imageLoading = false;
      },
      error: err => {
        console.error('Error processing image:', err);
        this.imageLoading = false;
      }
    });
  }



}
