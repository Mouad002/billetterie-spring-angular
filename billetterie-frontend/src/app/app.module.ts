import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyEventsComponent } from './features/organizer/components/my-events/my-events.component';
import { NewEventsComponent } from './features/organizer/components/new-events/new-events.component';
import { EventStatisticsComponent } from './features/organizer/components/event-statistics/event-statistics.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import { EventDetailsComponent } from './features/events/event-details/event-details.component';
import { TicketsSelectionComponent } from './features/events/tickets-selection/tickets-selection.component';
import { UpdateEventsComponent } from './features/organizer/components/update-events/update-events.component';
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
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './events/events.component';
import {
  EventDetailsOrganizerComponent
} from './features/organizer/components/event-details-organizer/event-details-organizer.component';
import {
  OrganizerLayoutComponentComponent
} from './features/organizer/components/organizer-layout-component/organizer-layout-component.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';


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
    EventDetailsComponent,
    TicketsSelectionComponent,
    UpdateEventsComponent,
    EventsComponent,
    EventDetailsOrganizerComponent,
    OrganizerLayoutComponentComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    NotAuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RouterLink,
    MatTableModule,
    MatButton,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    CommonModule,
    HttpClientModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    provideHttpClient(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
