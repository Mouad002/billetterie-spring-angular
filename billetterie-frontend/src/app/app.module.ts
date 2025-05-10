import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyEventsComponent } from './features/organizer/components/my-events/my-events.component';
import { NewEventsComponent } from './features/organizer/components/new-events/new-events.component';
import { EventStatisticsComponent } from './features/organizer/components/event-statistics/event-statistics.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {TicketsSelectionComponent} from './features/events/tickets-selection/tickets-selection.component';
import {EventsComponent} from './events/events.component';
import {EventDetailsComponent} from './features/events/event-details/event-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    MyEventsComponent,
    NewEventsComponent,
    EventStatisticsComponent,
    HeaderComponent,
    AppComponent,
    EventDetailsComponent,
    TicketsSelectionComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
