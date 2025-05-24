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
import {PaymentComponent} from './features/payment/payment.component';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
const routes: Routes = [
  {path:"login", component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {path:"home", component: EventsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:"not-authorized", component: NotAuthorizedComponent},



  {path : 'organizer', component : OrganizerLayoutComponentComponent, canActivate: [AuthenticationGuard,AuthorizationGuard],data: { roles: ['ROLE_ORGANIZER'] }, children : [
    {path : "my-events", component : MyEventsComponent},
    {path : "new-event", component : NewEventsComponent},
    {path : 'update-event/:id', component : UpdateEventsComponent},
    {path : "event-statistics/:id", component : EventStatisticsComponent},
    {path : "events-details/:id", component : EventDetailsOrganizerComponent},
  ]},

  {path:"ticket-selection", component: TicketsSelectionComponent},
  {path:'payment', component: PaymentComponent},

  {path: 'admin-panel', component: LayoutComponent},

  {path: 'admin-panel', component: LayoutComponent, canActivate: [AuthenticationGuard,AuthorizationGuard],data: { roles: ['ROLE_ADMIN'] },  // Add this line
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
