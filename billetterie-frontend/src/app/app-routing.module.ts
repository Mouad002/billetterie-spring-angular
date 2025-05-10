import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import {TicketsSelectionComponent} from './features/events/tickets-selection/tickets-selection.component';

const routes: Routes = [
  { path:"events", component:EventsComponent},
  {path:"ticket-selection", component: TicketsSelectionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
