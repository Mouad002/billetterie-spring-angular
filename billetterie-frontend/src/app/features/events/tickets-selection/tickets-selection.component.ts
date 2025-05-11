import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TicketServiceService} from '../../../services/ticketServices/ticket-service.service';
import {catchError, Observable, throwError} from 'rxjs';
import {AppEvent} from '../../../../model/event.model';
import {EventService} from '../../../services/event.service';
import {TicketType} from '../../../../model/TicketType.model';

interface TicketSelection {
  ticketId: string;
  quantity: number;
}
@Component({
  selector: 'tickets-selection',
  standalone:false,
  templateUrl: './tickets-selection.component.html',
  styleUrl: './tickets-selection.component.css'
})
export class TicketsSelectionComponent implements OnInit{
  ticketTypes!: TicketType[];
  eventId!: number;
  event: AppEvent | null = null;
  errorMessage!: string;
  ticketSelections: { ticketId: number, quantity: number }[] = []; // Initialize ticketSelections as an empty array

  constructor(private route: ActivatedRoute, private ticketService: TicketServiceService, private eventService: EventService) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.eventId = +params['eventId']; // '+' converts string to number
      console.log('Event ID:', this.eventId);
    });

    // Fetch ticket types
    this.getTicketTypes();

    // Fetch event details
    this.getEventDetails(this.eventId);
  }

  // Get ticket count based on ticketId
  getTicketCount(ticketId: number): number {
    const selection = this.ticketSelections.find(s => s.ticketId === ticketId);
    return selection ? selection.quantity : 0;
  }

  // Increase the ticket count, ensuring it doesn't exceed the maximum allowed
  increaseTicketCount(ticket: TicketType): void {
    const selection = this.ticketSelections.find(s => s.ticketId === ticket.id);
    if (selection && selection.quantity < 1000) {
      selection.quantity++;
    }
  }

  // Decrease the ticket count, ensuring it doesn't go below zero
  decreaseTicketCount(ticket: TicketType): void {
    const selection = this.ticketSelections.find(s => s.ticketId === ticket.id);
    if (selection && selection.quantity > 0) {
      selection.quantity--;
    }
  }

  // Calculate the total price for all ticket selections
  getTotalPrice(): number {
    let total = 0;
    this.ticketSelections.forEach(selection => {
      const ticket = this.ticketTypes.find(t => t.id === selection.ticketId);
      if (ticket) {
        total += ticket.price * selection.quantity;
      }
    });
    return total;
  }
  getEventDetails(id: number = 1): void {
    this.eventService.getEventDetails(id).pipe(
      catchError(error => {
        this.errorMessage = error.message;
        return throwError(() => error);
      })
    ).subscribe({
      next: data => {
        this.event = data;
        console.log('Event Details:', this.event); // Log the event details after it's fetched
      },
      error: err => console.error(err)
    });
  }
  getTicketTypes() {
    this.ticketService.getTicketTypesByEventId(this.eventId).subscribe({
      next: (types) => {
        this.ticketTypes = types;
        console.log('Ticket types:', this.ticketTypes);
        // Initialize ticket selections with zero quantity for each ticket type
        this.ticketTypes.forEach(ticket => {
          this.ticketSelections.push({
            ticketId: ticket.id,
            quantity: 0
          });
        });
      },
      error: (err) => {
        console.error('Failed to load ticket types:', err);
      }
    });
  }
}
