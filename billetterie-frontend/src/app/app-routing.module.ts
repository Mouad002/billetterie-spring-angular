import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../app/features/admin/components/layout/layout.component';
import { EvaluateEventComponent } from '../app/features/admin/components/evaluate-event/evaluate-event.component';
import { ManageEventsComponent } from '../app/features/admin/components/manage-events/manage-events.component';
import { ManageUsersComponent } from '../app/features/admin/components/manage-users/manage-users.component';

const routes: Routes = [
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
