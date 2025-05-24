import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-statistics',
  standalone: false,
  templateUrl: './event-statistics.component.html',
  styleUrl: './event-statistics.component.css'
})
export class EventStatisticsComponent implements OnInit {
  eventId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
    });
  }

  downloadReport(): void {
    // Fonctionnalité à implémenter plus tard
    console.log('Téléchargement du rapport pour l\'événement:', this.eventId);
  }
}
