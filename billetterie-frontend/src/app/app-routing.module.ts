import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyEventsComponent } from './features/organizer/components/my-events/my-events.component';
import { NewEventsComponent } from './features/organizer/components/new-events/new-events.component';
import { UpdateEventsComponent } from './features/organizer/components/update-events/update-events.component';
import { StatisticsComponent } from './features/organizer/components/statistics/statistics.component';

const routes: Routes = [
  {path : "my-events", component : MyEventsComponent}, 
  {path : "new-event", component : NewEventsComponent},
  {path : "statistics", component : StatisticsComponent},
  {path : "update-event/:id", component : UpdateEventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
