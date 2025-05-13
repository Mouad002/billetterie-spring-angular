import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyEventsComponent } from './features/organizer/components/my-events/my-events.component';
import { NewEventsComponent } from './features/organizer/components/new-events/new-events.component';
import { EventStatisticsComponent } from './features/organizer/components/event-statistics/event-statistics.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LayoutComponent } from './features/admin/components/layout/layout.component';
import { EvaluateEventComponent } from './features/admin/components/evaluate-event/evaluate-event.component';
import { ManageEventsComponent } from './features/admin/components/manage-events/manage-events.component';
import { ManageUsersComponent } from './features/admin/components/manage-users/manage-users.component';
import { TableViewDemoComponent } from './features/admin/components/table-view-demo/table-view-demo.component';
import { MatTableModule } from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideHttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    MyEventsComponent,
    NewEventsComponent,
    EventStatisticsComponent,
    HeaderComponent,
    LayoutComponent,
    EvaluateEventComponent,
    ManageEventsComponent,
    ManageUsersComponent,
    TableViewDemoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatButton,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
