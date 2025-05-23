import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatisticsService, EventStatistics } from '../../services/statistics.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-event-statistics',
  standalone: false,
  templateUrl: './event-statistics.component.html',
  styleUrl: './event-statistics.component.css'
})
export class EventStatisticsComponent implements OnInit {
  eventId!: number;
  statistics!: EventStatistics;
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
      this.loadStatistics();
    });
  }

  loadStatistics() {
    this.isLoading = true;
    this.statisticsService.getEventStatistics(this.eventId).pipe(
      catchError(error => {
        this.error = 'Erreur lors du chargement des statistiques';
        this.isLoading = false;
        return throwError(() => error);
      })
    ).subscribe({
      next: (data) => {
        this.statistics = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.isLoading = false;
      }
    });
  }

  exportStatistics() {
    this.statisticsService.exportStatistics(this.eventId).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `statistiques-evenement-${this.eventId}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erreur lors de l\'export:', err);
        // Ajouter une notification d'erreur ici
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD'
    }).format(amount);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
