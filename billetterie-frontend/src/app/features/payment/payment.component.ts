import {Component, OnInit} from '@angular/core';
import {TicketServiceService} from '../../services/ticketServices/ticket-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  totalPrice!: number;
  paymentForm!: FormGroup;
  currentDate = new Date();
  months = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' }
  ];
  years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  constructor(private ticketService: TicketServiceService,private fb: FormBuilder,
              private router: Router) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['card', Validators.required],
      cardholderName: ['', Validators.required],
      cardNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{16}$/)
      ]],
      expiryMonth: ['01', Validators.required],
      expiryYear: [new Date().getFullYear(), Validators.required],
      cvv: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{3,4}$/)
      ]],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }
  ngOnInit(): void {
    this.totalPrice = this.ticketService.getTotalPrice();
  }
  cancelPayment(): void {
    // Handle cancel logic
    if (confirm('Are you sure you want to cancel this payment?')) {
      this.router.navigate(['/checkout']);
    }
  }
  // Helper method to format card number with spaces
  formatCardNumber(event: any): void {
    const input = event.target;
    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    // Add spaces after every 4 digits
    const numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');
    this.paymentForm.controls['cardNumber'].setValue(input.value);
  }
}
