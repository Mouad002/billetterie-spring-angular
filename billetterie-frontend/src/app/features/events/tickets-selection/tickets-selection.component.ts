import {Component, OnInit} from '@angular/core';
interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  maxPerOrder: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  description: string;
}

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
   event: Event = {
    id: "evt-001",
    title: "Summer Music Festival 2025",
    date: "June 15, 2025",
    time: "4:00 PM - 11:00 PM",
    location: "Central Park, New York",
    imageUrl: "",
    description: "Join us for an unforgettable day of music featuring top artists from around the world. Food and drinks available for purchase."
  };

  ticketTypes: TicketType[] = [
    {
      id: "regular",
      name: "Regular Admission",
      price: 49.99,
      description: "General admission to all festival areas",
      maxPerOrder: 8
    },
    {
      id: "vip",
      name: "VIP Package",
      price: 149.99,
      description: "Includes fast-track entry, reserved seating & complimentary drinks",
      maxPerOrder: 4
    }
  ];

  ticketSelections: TicketSelection[] = [];

  constructor() { }

  ngOnInit(): void {
    // Initialize ticket selections with zero quantity
    this.ticketTypes.forEach(ticket => {
      this.ticketSelections.push({
        ticketId: ticket.id,
        quantity: 0
      });
    });
  }

  getTicketCount(ticketId: string): number {
    const selection = this.ticketSelections.find(s => s.ticketId === ticketId);
    return selection ? selection.quantity : 0;
  }

  increaseTicketCount(ticket: TicketType): void {
    const selection = this.ticketSelections.find(s => s.ticketId === ticket.id);
    if (selection && selection.quantity < ticket.maxPerOrder) {
      selection.quantity++;
    }
  }

  decreaseTicketCount(ticket: TicketType): void {
    const selection = this.ticketSelections.find(s => s.ticketId === ticket.id);
    if (selection && selection.quantity > 0) {
      selection.quantity--;
    }
  }

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
}
