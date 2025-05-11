import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyEventsComponent } from './features/organizer/components/my-events/my-events.component';
import { NewEventsComponent } from './features/organizer/components/new-events/new-events.component';
import { EventStatisticsComponent } from './features/organizer/components/event-statistics/event-statistics.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { EventDetailsComponent } from './features/events/event-details/event-details.component';
import { TicketsSelectionComponent } from './features/events/tickets-selection/tickets-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    MyEventsComponent,
    NewEventsComponent,
    EventStatisticsComponent,
    HeaderComponent,
    EventDetailsComponent, 
    TicketsSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    FormsModule, 
    RouterModule, 
    RouterLink
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
