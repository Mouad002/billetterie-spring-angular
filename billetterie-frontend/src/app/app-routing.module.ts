import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyEventsComponent } from './features/organizer/components/my-events/my-events.component';
import { NewEventsComponent } from './features/organizer/components/new-events/new-events.component';
import { UpdateEventsComponent } from './features/organizer/components/update-events/update-events.component';
import { EventStatisticsComponent } from './features/organizer/components/event-statistics/event-statistics.component';
import { EventsComponent } from './events/events.component';
import { TicketsSelectionComponent } from './features/events/tickets-selection/tickets-selection.component';
import { EventDetailsComponent } from './features/events/event-details/event-details.component';

const routes: Routes = [
  {path : "my-events", component : MyEventsComponent}, 
  {path : "new-event", component : NewEventsComponent},
  {path : "update-event", component : UpdateEventsComponent},
  {path : "event-statistics", component : EventStatisticsComponent},
  { path:"events", component: EventsComponent},
  {path:"ticket-selection", component: TicketsSelectionComponent},
  {path : "events-details", component : EventDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
