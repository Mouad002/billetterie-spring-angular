import { Component, OnInit } from '@angular/core';
import { AdminService, UpdateEventStatusInterface } from '../../services/admin.service';
import { PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface EventEvaluation {
  id: number,
  title: string,
  startDate: Date,
  endDate: Date,
  location: string,
  organizer: string
}

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Component({
  selector: 'app-evaluate-event',
  standalone: false,
  templateUrl: './evaluate-event.component.html',
  styleUrl: './evaluate-event.component.css'
})
export class EvaluateEventComponent implements OnInit {
  dataSource: any;
  originalContent: any;
  displayedColumns: string[] = ['id', 'title', 'startDate', 'endDate', 'location', 'organizer', 'actions'];

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageIndex = 0;
  totalItems = 0;

  isLoading = false;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.adminService.fetchTableData(this.pageIndex, this.pageSize).subscribe({
      next: (response: PaginatedResponse<EventEvaluation>) => {
        console.log(response);
        this.dataSource = response.content;
        this.totalItems = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  // Action methods
  viewDetails(eventEvaluation: EventEvaluation): void {
    console.log('View details of event:', eventEvaluation);
    // Implement your view details logic here
    // For example: this.router.navigate(['/products', product.id]);
  }

  evaluate(eventEvaluation: EventEvaluation, status: string): void {
    this.isLoading = true;
    let item: UpdateEventStatusInterface = {
      id: eventEvaluation.id,
      status: status
    }
    this.adminService.acceptEvent(item).subscribe({
      next: (response: any) => {
        if (response.status == 200) {
          this.loadData();
          this.openSnackBar(response.message, 'ok');
        } else {
          this.openSnackBar(response.message, 'ok');
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.openSnackBar(error, 'ok');
        this.isLoading = false;
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
