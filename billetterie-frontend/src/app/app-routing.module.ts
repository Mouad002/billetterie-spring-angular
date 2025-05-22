import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyEventsComponent } from './features/organizer/components/my-events/my-events.component';
import { NewEventsComponent } from './features/organizer/components/new-events/new-events.component';
import { UpdateEventsComponent } from './features/organizer/components/update-events/update-events.component';
import { EventStatisticsComponent } from './features/organizer/components/event-statistics/event-statistics.component';
import { EventsComponent } from './events/events.component';
import { TicketsSelectionComponent } from './features/events/tickets-selection/tickets-selection.component';
import { EventDetailsComponent } from './features/events/event-details/event-details.component';
import { LayoutComponent } from '../app/features/admin/components/layout/layout.component';
import { EvaluateEventComponent } from '../app/features/admin/components/evaluate-event/evaluate-event.component';
import { ManageEventsComponent } from '../app/features/admin/components/manage-events/manage-events.component';
import { ManageUsersComponent } from '../app/features/admin/components/manage-users/manage-users.component';
import { OrganizerLayoutComponentComponent } from './features/organizer/components/organizer-layout-component/organizer-layout-component.component';
import { EventDetailsOrganizerComponent } from './features/organizer/components/event-details-organizer/event-details-organizer.component';


const routes: Routes = [

  {path : 'organizer', component : OrganizerLayoutComponentComponent, children : [
    {path : "my-events", component : MyEventsComponent},
    {path : "new-event", component : NewEventsComponent},
    {path : 'update-event/:id', component : UpdateEventsComponent},
    {path : "event-statistics/:id", component : EventStatisticsComponent},
    {path : "events-details/:id", component : EventDetailsOrganizerComponent},
  ]},

  {path:"home", component: EventsComponent},
  {path:"ticket-selection", component: TicketsSelectionComponent},
  
  {path: 'admin-panel', component: LayoutComponent, 
    children: [
      {path: 'validate-events', component: EvaluateEventComponent},
      {path: 'manage-events', component: ManageEventsComponent},
      {path: 'manage-users', component: ManageUsersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
